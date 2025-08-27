"use client";
import { FC, useMemo } from "react";
import useSWR from "swr";
import { useAQIStore } from "@/app/store/useAQIStore";
import {
  APP_CONSTS,
  FetchSchema_WAQI,
  FetchSchema_SC,
  getIndication,
} from "@/shared/models/index";
import { fetcherWAQI, fetcherSC } from "@/shared/lib/index";
import {
  API_LINKS,
  API_FETCH_INTERVAL,
  convertPM25ToAQI,
} from "@/shared/api/index";

export const IndicationTile: FC = () => {
  const waqiStoreData = useAQIStore((state) => state.waqiData);
  const scStoreData = useAQIStore((state) => state.scData);

  const {
    data: waqiData,
    error: waqiError,
    isLoading: waqiIsLoading,
  } = useSWR<FetchSchema_WAQI>(API_LINKS.waqi, fetcherWAQI, {
    refreshInterval: API_FETCH_INTERVAL,
  });
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
    }
  );

  const indication = useMemo(() => {
    const newAqi =
      waqiData?.aqi ??
      (waqiData?.pm25 ? convertPM25ToAQI(waqiData.pm25) : null) ??
      (scData?.pm25 ? convertPM25ToAQI(scData.pm25) : null) ??
      waqiStoreData?.aqi ??
      (waqiStoreData?.pm25 ? convertPM25ToAQI(waqiStoreData.pm25) : null) ??
      (scStoreData?.pm25 ? convertPM25ToAQI(scStoreData.pm25) : null) ??
      null;
    return getIndication(newAqi);
  }, [waqiData, waqiStoreData, scData, scStoreData]);

  if (waqiError && scError)
    return (
      <div
        className="w-full h-full text-left font-sans font-medium lg:border-1 lg:border-black lg:rounded-2xl flex flex-col justify-between px-15 pt-6.5"
        style={{
          backgroundColor: indication.color ? indication.color : "#d4d4d4",
        }}
      >
        <div className="relative h-full w-full">
          <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
            Error: {(waqiError ?? scError).toLocaleString()}
          </h1>
        </div>
      </div>
    );
  if (waqiIsLoading || scIsLoading)
    return (
      <div
        className="w-full h-full text-left font-sans font-medium lg:border-1 lg:border-black lg:rounded-2xl flex flex-col justify-between px-15 pt-6.5"
        style={{
          backgroundColor: indication.color ? indication.color : "#d4d4d4",
        }}
      >
        <div className="relative h-full w-full">
          <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
            loading...
          </h1>
        </div>
      </div>
    );

  const content = (
    <>
      <div
        className={
          "w-full min-h-[295px] lg:h-full text-left font-sans lg:rounded-2xl lg:border-1 lg:border-black flex flex-col justify-between px-10 pt-6 pb-9"
        }
        style={{
          backgroundColor: indication.color ? indication.color : "#d4d4d4",
        }}
      >
        <div>
          <h1 className="text-[50px] lg:text-[75px] font-medium leading-12 lg:leading-19.5 tracking-[-3px]">
            {indication.title != "no data" &&
            indication.title != undefined &&
            indication.title != null
              ? APP_CONSTS.indicationTile.title1
              : ""}
          </h1>
          <h2 className="text-[50px] lg:text-[75px] font-medium leading-12 lg:leading-19.5 tracking-[-2px]">
            {indication.title}
          </h2>
        </div>

        <p className="text-[34px] lg:text-[30px] font-[400] leading-8 tracking-[0.1px] pb-0.5">
          {`${
            indication.title != "no data" ? APP_CONSTS.indicationTile.desc1 : ""
          } ${indication.desc}`}
        </p>
      </div>
    </>
  );

  return content;
};
