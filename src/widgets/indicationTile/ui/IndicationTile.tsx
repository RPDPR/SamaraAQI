"use client";
import { FC, useMemo } from "react";
import useSWR from "swr";
import { useAQIStore } from "@/app/store/useAQIStore";
import {
  APP_CONSTS,
  FetchSchema_WAQI,
  FetchSchema_SC,
  I_Indication,
  getIndication,
} from "@/shared/models/index";
import { fetcherWAQI, fetcherSC } from "@/shared/lib/index";
import {
  API_LINKS,
  API_FETCH_INTERVAL,
  convertPM25ToAQI,
} from "@/shared/api/index";

export const IndicationTile: FC = () => {
  const token = process.env.NEXT_PUBLIC_WAQI_API_TOKEN;

  const waqiStoreData_aqi = useAQIStore((state) => state.waqiData.aqi);
  const waqiStoreData_pm25 = useAQIStore((state) => state.waqiData.pm25);
  const scStoreData_pm25 = useAQIStore((state) => state.scData.pm25);

  const {
    data: waqiData,
    error: waqiError,
    isLoading: waqiIsLoading,
  } = useSWR<FetchSchema_WAQI>(
    token ? `${API_LINKS.waqi}${token}` : null,
    fetcherWAQI,
    {
      refreshInterval: API_FETCH_INTERVAL,
      dedupingInterval: 2000,
      shouldRetryOnError: false,
    }
  );
  const {
    data: scData,
    error: scError,
    isLoading: scIsLoading,
  } = useSWR<FetchSchema_SC>(
    !waqiData && waqiError ? API_LINKS.sc : null,
    fetcherSC,
    {
      refreshInterval: API_FETCH_INTERVAL,
      revalidateOnMount: false,
      dedupingInterval: 2000,
    }
  );

  const aqi = waqiData?.aqi ?? waqiStoreData_aqi;
  const pm25 =
    waqiData?.pm25 ?? waqiStoreData_pm25 ?? scData?.pm25 ?? scStoreData_pm25;

  const indication = useMemo<I_Indication>(() => {
    const newAqi = aqi ?? (pm25 ? convertPM25ToAQI(pm25) : null);
    return getIndication(newAqi);
  }, [aqi, pm25]);

  if (waqiError && scError)
    return (
      <div className="w-full lg:w-full 2k:w-full 4k:w-full h-full px-6 lg:px-0 2k:px-0 4k:px-0">
        <div
          className="w-110 lg:w-full 2k:w-full 4k:w-full h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 text-left font-sans font-medium lg:border-1 2k:border-1 4k:border-1 lg:border-black 2k:border-black 4k:border-black lg:rounded-2xl 2k:rounded-3xl 4k:rounded-4xl flex flex-col justify-between px-9 lg:px-15 2k:px-22.5 4k:px-30 pt-6.5 lg:pt-6.5 2k:pt-9.75 4k:pt-13"
          style={
            indication.color
              ? {
                  backgroundColor: indication.color,
                }
              : {}
          }
        >
          <div className="relative h-full w-full">
            <h1 className="absolute text-[34px] lg:text-[34px] 2k:text-[51px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-42 2k:top-72.75 4k:top-97">
              {APP_CONSTS.errorMessage.failedToFetch}
            </h1>
          </div>
        </div>
      </div>
    );
  if (waqiIsLoading || scIsLoading)
    return (
      <div className="w-full lg:w-full 2k:w-full 4k:w-full h-full px-6 lg:px-0 2k:px-0 4k:px-0">
        <div
          className="w-110 lg:w-full 2k:w-full 4k:w-full h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 text-left font-sans font-medium lg:border-1 2k:border-1 4k:border-1 lg:border-black 2k:border-black 4k:border-black lg:rounded-2xl 2k:rounded-3xl 4k:rounded-4xl flex flex-col justify-between px-9 lg:px-15 2k:px-22.5 4k:px-30 pt-6.5 lg:pt-6.5 2k:pt-9.75 4k:pt-13"
          style={
            indication.color
              ? {
                  backgroundColor: indication.color,
                }
              : {}
          }
        >
          <div className="relative h-full w-full">
            <h1 className="absolute text-[34px] lg:text-[34px] 2k:text-[51px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-42 2k:top-72.75 4k:top-97">
              loading...
            </h1>
          </div>
        </div>
      </div>
    );

  const content = (
    <>
      <div
        className={
          "w-full h-full lg:h-full 2k:h-full 4k:h-full font-sans lg:rounded-2xl 2k:rounded-3xl 4k:rounded-4xl lg:border-1 2k:border-1 4k:border-1 lg:border-black 2k:border-black 4k:border-black flex flex-col justify-between px-10 lg:px-14 2k:px-21 4k:px-28 pt-2 lg:pt-12.5 2k:pt-18.75 4k:pt-25 pb-9 lg:pb-20 2k:pb-30 4k:pb-40"
        }
        style={
          indication.color
            ? {
                backgroundColor: indication.color,
              }
            : {}
        }
      >
        <div className="mx-auto lg:mx-0 2k:mx-0 4k:mx-0">
          <h1 className="text-[50px] font-medium lg:text-[89px] 2k:text-[133px] 4k:text-[178px] leading-[100%] lg:leading-[100%] 2k:leading-[100%] 4k:leading-[100%] tracking-[-4px] lg:tracking-[-6px] 2k:tracking-[-9px] 4k:tracking-[-12px]">
            {indication.title != "no data" && indication.title != null
              ? APP_CONSTS.indicationTile.title1
              : ""}
          </h1>
          <h2 className="text-[50px] font-medium lg:text-[89px] 2k:text-[133px] 4k:text-[178px] leading-[100%] lg:leading-[100%] 2k:leading-[100%] 4k:leading-[100%] tracking-[-3px] lg:tracking-[-5.2px] 2k:tracking-[-7.8px] 4k:tracking-[-10.4px]">
            {indication.title}
          </h2>
        </div>
        <div className="w-110 mx-auto lg:mx-0 2k:mx-0 4k:mx-0">
          <p className="text-[34px] lg:text-[34px] 2k:text-[51px] 4k:text-[68px] font-regular leading-[100%] lg:leading-[0%] 2k:leading-[0%] 4k:leading-[0%]">
            {`${
              indication.title != "no data"
                ? APP_CONSTS.indicationTile.desc1
                : ""
            } ${indication.desc}`}
          </p>
        </div>
      </div>
    </>
  );

  return content;
};
