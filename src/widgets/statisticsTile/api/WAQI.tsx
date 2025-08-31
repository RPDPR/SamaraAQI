"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAQIStore } from "@/app/store/useAQIStore";
import { T_WAQI } from "../model/types";
import { FC } from "react";
import { SC } from "./SC";
import { API_LINKS, API_FETCH_INTERVAL } from "@/shared/api/index";
import { APP_CONSTS } from "@/shared/models/index";
import { fetcherWAQI } from "@/shared/lib/index";
import { convertPM25ToAQI } from "@/shared/api/utils";

export const WAQI: FC<T_WAQI> = ({ secondary }) => {
  const token = process.env.NEXT_PUBLIC_WAQI_API_TOKEN;

  const waqiStoreData_aqi = useAQIStore((state) => state.waqiData.aqi);
  const waqiStoreData_pm25 = useAQIStore((state) => state.waqiData.pm25);
  const waqiStoreData_pm10 = useAQIStore((state) => state.waqiData.pm10);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateWaqiData = useAQIStore((state) => state.updateWaqiData);

  const {
    data: waqiData,
    error: waqiError,
    isLoading: waqiIsLoading,
  } = useSWR(token ? `${API_LINKS.waqi}${token}` : null, fetcherWAQI, {
    refreshInterval: API_FETCH_INTERVAL,
  });

  const aqi = waqiData?.aqi ?? waqiStoreData_aqi;
  const pm25 = waqiData?.pm25 ?? waqiStoreData_pm25;
  const pm10 = waqiData?.pm10 ?? waqiStoreData_pm10;

  const [res, setRes] = useState<{
    resultString: string;
    resultValue: string;
  }>({ resultString: "", resultValue: "" });

  useEffect(() => {
    const shouldUpdate =
      aqi !== waqiStoreData_aqi ||
      pm25 !== waqiStoreData_pm25 ||
      pm10 !== waqiStoreData_pm10;

    if (shouldUpdate) {
      updateWaqiData({ aqi, pm10, pm25 });
    }

    let res: { resultString: string; resultValue: string } = {
      resultString: "",
      resultValue: "",
    };

    if (!secondary) {
      res =
        aqi != null
          ? {
              resultString: APP_CONSTS.measurementName.aqi,
              resultValue: aqi.toFixed(0),
            }
          : pm25 != null
          ? {
              resultString: APP_CONSTS.measurementName.aqi,
              resultValue: convertPM25ToAQI(pm25).toFixed(),
            }
          : { resultString: "", resultValue: "no data" };
    } else {
      if (
        lastUpdated != null &&
        Object.keys(lastUpdated).length &&
        lastUpdated.key != "aqi"
      ) {
        res =
          lastUpdated.key == "pm25" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${lastUpdated.value.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : lastUpdated.key == "pm10" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${lastUpdated.value.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : { resultString: "", resultValue: "no data" };
      } else {
        res =
          pm25 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${pm25.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : pm10 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${pm10.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : { resultString: "", resultValue: "no data" };
      }
    }
    setRes(res);
  }, [
    aqi,
    pm25,
    pm10,
    lastUpdated,
    secondary,
    waqiStoreData_aqi,
    waqiStoreData_pm10,
    waqiStoreData_pm25,
    updateWaqiData,
  ]);

  if (waqiError) return <SC secondary={secondary} />;
  if (waqiIsLoading)
    return (
      <div className="relative w-110 h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 px-9 lg:px-0 2k:px-0 4k:px-0">
        <h1 className="absolute text-[34px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-48.5 4k:top-97 lg:px-0 2k:px-0 4k:px-0">
          loading...
        </h1>
      </div>
    );

  if (aqi == null || pm25 == null || pm10 == null)
    return <SC secondary={secondary} />;

  return (
    <div className="relative w-110 h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 min-h-[149.5px] 4k:min-h-[299px]">
      <h1 className="absolute text-[80px] lg:text-[200px] 4k:text-[400px] font-sans font-semibold top-[10] lg:top-[-10] 4k:top-[-20] lg:left-2 tracking-[-5px] lg:tracking-[-11px] 4k:tracking-[-22px] text-nowrap">
        {res.resultValue ? res.resultValue.toLocaleString() : "no data"}
      </h1>
      <h2 className="absolute text-[40px] lg:text-[40px] 4k:text-[80px] font-sans font-bold top-[110px] lg:top-54.5 4k:top-109 lg:left-[7px] 4k:left-[14px] tracking-[-2.7px] lg:tracking-[-2.8px] 4k:tracking-[-5.6px] lg:w-60 4k:w-120">
        {res.resultString ? res.resultString.toLocaleString() : ""}
      </h2>
    </div>
  );
};
