"use client";
import { useEffect } from "react";
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
  const waqiData = useAQIStore((state) => state.waqiData);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateWaqiData = useAQIStore((state) => state.updateWaqiData);

  const { data, error, isLoading } = useSWR(API_LINKS.waqi, fetcherWAQI, {
    refreshInterval: API_FETCH_INTERVAL,
  });

  useEffect(() => {
    if (!data) return;
    if (
      waqiData.aqi == data.aqi ||
      waqiData.pm10 == data.pm10 ||
      waqiData.pm25 == data.pm25
    ) {
      return;
    }

    updateWaqiData({
      aqi: data?.aqi,
      pm10: data?.pm10,
      pm25: data?.pm25,
    });
  }, [data, updateWaqiData, waqiData.aqi, waqiData.pm10, waqiData.pm25]);

  if (error) return <SC secondary={secondary} />;
  if (isLoading)
    return (
      <div className="relative h-full w-full ">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          loading...
        </h1>
      </div>
    );
  if (!data) return <SC secondary={secondary} />;

  let res: { resultString: string; resultValue: string } = {
    resultString: "",
    resultValue: "",
  };

  if (!secondary) {
    res.resultString = APP_CONSTS.measurementName.aqi;
    const aqi =
      data.aqi ??
      waqiData.aqi ??
      (data.pm25 != null ? convertPM25ToAQI(data.pm25) : null) ??
      (waqiData.pm25 != null ? convertPM25ToAQI(waqiData.pm25) : null);

    res.resultValue = aqi != null ? aqi.toFixed(0) : "no data";
  } else {
    if (!lastUpdated || lastUpdated.length == 0) {
      res =
        (data.pm25 ?? waqiData.pm25) != null
          ? {
              resultString: APP_CONSTS.measurementName.pm25,
              resultValue:
                (data.pm25 ?? waqiData.pm25) != null
                  ? `${(data.pm25 ?? waqiData.pm25).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm25
                    }`
                  : "no data",
            }
          : (data.pm10 ?? waqiData.pm10) != null
          ? {
              resultString: APP_CONSTS.measurementName.pm10,
              resultValue:
                (data.pm10 ?? waqiData.pm10) != null
                  ? `${(data.pm10 ?? waqiData.pm10).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm10
                    }`
                  : "no data",
            }
          : res;
    }
    lastUpdated.forEach((el) => {
      res =
        el.key == "pm25"
          ? {
              resultString: APP_CONSTS.measurementName.pm25,
              resultValue:
                (data.pm25 ?? waqiData.pm25) != null
                  ? `${(data.pm25 ?? waqiData.pm25).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm25
                    }`
                  : "no data",
            }
          : el.key == "pm10"
          ? {
              resultString: APP_CONSTS.measurementName.pm10,
              resultValue:
                (data.pm10 ?? waqiData.pm10) != null
                  ? `${(data.pm10 ?? waqiData.pm10).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm10
                    }`
                  : "no data",
            }
          : res;
      return;
    });
  }

  return (
    <div className="relative h-full w-full text-nowrap">
      <h1 className="absolute lg:text-[178px] font-sans font-semibold lg:top-[-10]">
        {res.resultValue.toLocaleString()}
      </h1>
      <h2 className="absolute lg:text-[34px] font-sans font-extrabold lg:top-48.5 lg:left-[-1px]">
        {res.resultString.toLocaleString()}
      </h2>
    </div>
  );
};
