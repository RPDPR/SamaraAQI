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
  const waqiStoreData_aqi = useAQIStore((state) => state.waqiData.aqi);
  const waqiStoreData_pm25 = useAQIStore((state) => state.waqiData.pm25);
  const waqiStoreData_pm10 = useAQIStore((state) => state.waqiData.pm10);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateWaqiData = useAQIStore((state) => state.updateWaqiData);

  const {
    data: waqiData,
    error,
    isLoading,
  } = useSWR(API_LINKS.waqi, fetcherWAQI, {
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
      res.resultString = APP_CONSTS.measurementName.aqi;
      res.resultValue =
        aqi != null
          ? aqi.toFixed(0)
          : pm25 != null
          ? convertPM25ToAQI(pm25).toFixed()
          : "no data";
    } else {
      if (lastUpdated != null && Object.keys(lastUpdated).length) {
        res =
          lastUpdated.key == "pm25" && pm25 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${pm25.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : lastUpdated.key == "pm10" && pm10 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${pm10.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : { resultString: "", resultValue: "no data" };
      } else {
        res =
          pm25 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${pm25.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : pm10 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${pm10.toFixed(1)} ${
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

  if (error) return <SC secondary={secondary} />;
  if (isLoading)
    return (
      <div className="relative h-full w-full ">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          loading...
        </h1>
      </div>
    );
  if (!waqiData) return <SC secondary={secondary} />;

  return (
    <div className="relative h-full w-full text-nowrap">
      <h1 className="absolute lg:text-[178px] font-sans font-semibold lg:top-[-10]">
        {res.resultValue ? res.resultValue.toLocaleString() : "no data"}
      </h1>
      <h2 className="absolute lg:text-[34px] font-sans font-extrabold lg:top-48.5 lg:left-[-1px]">
        {res.resultString ? res.resultString.toLocaleString() : ""}
      </h2>
    </div>
  );
};
