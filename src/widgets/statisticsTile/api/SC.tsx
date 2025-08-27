"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { useAQIStore } from "@/app/store/useAQIStore";
import { T_SC } from "../model/types";
import { FC } from "react";
import { API_LINKS, API_FETCH_INTERVAL } from "@/shared/api/index";
import { APP_CONSTS } from "@/shared/models/index";
import { fetcherSC } from "@/shared/lib/index";
import { convertPM25ToAQI } from "@/shared/api/utils";
import { TryAgainButton } from "@/shared/ui/index";

export const SC: FC<T_SC> = ({ secondary }) => {
  const scData = useAQIStore((state) => state.scData);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateScData = useAQIStore((state) => state.updateScData);

  const { data, error, isLoading, mutate } = useSWR(API_LINKS.sc, fetcherSC, {
    refreshInterval: API_FETCH_INTERVAL,
  });

  useEffect(() => {
    if (!data) return;

    if (
      scData.pm10 == data.pm10 ||
      scData.pm25 == data.pm25 ||
      scData.temperature == data.temperature ||
      scData.humidity == data.humidity
    ) {
      return;
    }

    updateScData({
      pm10: data?.pm10,
      pm25: data?.pm25,
      temperature: data?.temperature,
      humidity: data?.humidity,
    });
  }, [
    data,
    updateScData,
    scData.pm10,
    scData.pm25,
    scData.temperature,
    scData.humidity,
  ]);

  if (error)
    return (
      <div className="relative h-full w-full">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          Error: {error.toLocaleString()}
        </h1>
        <div className="absolute text-[34px] font-sans font-extrabold top-48.5 left-150">
          <TryAgainButton
            w={180}
            h={50}
            fs={20}
            text="try again"
            onClick={() => {
              mutate(undefined, { revalidate: true });
            }}
          />
        </div>
      </div>
    );
  if (isLoading)
    return (
      <div className="relative h-full w-full">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          loading...
        </h1>
      </div>
    );
  if (!data)
    return (
      <div className="relative h-full w-full">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          no data
        </h1>
      </div>
    );

  let res: { resultString: string; resultValue: string } = {
    resultString: "",
    resultValue: "",
  };

  if (!secondary) {
    res.resultString = APP_CONSTS.measurementName.aqi;
    const aqi =
      (data.pm25 != null ? convertPM25ToAQI(data.pm25) : null) ??
      (scData.pm25 != null ? convertPM25ToAQI(scData.pm25) : null);
    res.resultValue = aqi != null ? aqi.toFixed(0) : "no data";
  } else {
    if (!lastUpdated || lastUpdated.length == 0) {
      res =
        (data.pm25 ?? scData.pm25) != null
          ? {
              resultString: APP_CONSTS.measurementName.pm25,
              resultValue:
                (data.pm25 ?? scData.pm25) != null
                  ? `${(data.pm25 ?? scData.pm25).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm25
                    }`
                  : "no data",
            }
          : (data.temperature ?? scData.temperature) != null
          ? {
              resultString: APP_CONSTS.measurementName.temperature,
              resultValue:
                (data.temperature ?? scData.temperature) != null
                  ? `${(data.temperature ?? scData.temperature).toFixed(1)} ${
                      APP_CONSTS.unitsOfMeasurement.temperature
                    }`
                  : "no data",
            }
          : (data.pm10 ?? scData.pm10) != null
          ? {
              resultString: APP_CONSTS.measurementName.pm10,
              resultValue:
                (data.pm10 ?? scData.pm10) != null
                  ? `${(data.pm10 ?? scData.pm10).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm10
                    }`
                  : "no data",
            }
          : (data.humidity ?? scData.humidity) != null
          ? {
              resultString: APP_CONSTS.measurementName.humidity,
              resultValue:
                (data.humidity ?? scData.humidity) != null
                  ? `${(data.humidity ?? scData.humidity).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.humidity
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
                (data.pm25 ?? scData.pm25) != null
                  ? `${(data.pm25 ?? scData.pm25).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm25
                    }`
                  : "no data",
            }
          : el.key == "temperature"
          ? {
              resultString: APP_CONSTS.measurementName.temperature,
              resultValue:
                (data.temperature ?? scData.temperature) != null
                  ? `${(data.temperature ?? scData.temperature).toFixed(1)} ${
                      APP_CONSTS.unitsOfMeasurement.temperature
                    }`
                  : "no data",
            }
          : el.key == "pm10"
          ? {
              resultString: APP_CONSTS.measurementName.pm10,
              resultValue:
                (data.pm10 ?? scData.pm10) != null
                  ? `${(data.pm10 ?? scData.pm10).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.pm10
                    }`
                  : "no data",
            }
          : el.key == "humidity"
          ? {
              resultString: APP_CONSTS.measurementName.humidity,
              resultValue:
                (data.humidity ?? scData.humidity) != null
                  ? `${(data.humidity ?? scData.humidity).toFixed(0)} ${
                      APP_CONSTS.unitsOfMeasurement.humidity
                    }`
                  : "no data",
            }
          : res;
      return;
    });
  }

  return (
    <div className="relative h-full w-full">
      <h1 className="absolute lg:text-[178px] font-sans font-semibold lg:top-[-10]">
        {res.resultValue.toLocaleString()}
      </h1>
      <h2 className="absolute lg:text-[34px] font-sans font-extrabold lg:top-48.5 lg:left-[-1px]">
        {res.resultString.toLocaleString()}
      </h2>
    </div>
  );
};
