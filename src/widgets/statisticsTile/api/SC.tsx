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
  const { data, error, isLoading, mutate } = useSWR(API_LINKS.sc, fetcherSC, {
    refreshInterval: API_FETCH_INTERVAL,
  });
  const scData = useAQIStore((state) => state.scData);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateScData = useAQIStore((state) => state.updateScData);

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
              mutate();
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
    res.resultString = APP_CONSTS.measurementNames.aqi;
    res.resultValue = String(
      convertPM25ToAQI(data.pm25).toFixed(1) ??
        (scData.pm25 ? convertPM25ToAQI(scData.pm25).toFixed(1) : "no data")
    );
  } else {
    if (!lastUpdated || lastUpdated.length == 0) {
      res =
        data.pm25 || scData.pm25
          ? {
              resultString: APP_CONSTS.measurementNames.pm25,
              resultValue:
                (data.pm25 ?? scData.pm25).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.pm25,
            }
          : data.temperature || scData.temperature
          ? {
              resultString: APP_CONSTS.measurementNames.temperature,
              resultValue:
                (data.temperature ?? scData.temperature).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.temperature,
            }
          : data.pm10 || scData.pm10
          ? {
              resultString: APP_CONSTS.measurementNames.pm10,
              resultValue:
                (data.pm10 ?? scData.pm10).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.pm10,
            }
          : data.humidity || scData.humidity
          ? {
              resultString: APP_CONSTS.measurementNames.humidity,
              resultValue:
                (data.humidity ?? scData.humidity).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.humidity,
            }
          : res;
    }

    lastUpdated.forEach((el) => {
      res =
        el.key == "pm25"
          ? {
              resultString: APP_CONSTS.measurementNames.pm25,
              resultValue:
                (data.pm25 ?? scData.pm25).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.pm25,
            }
          : el.key == "temperature"
          ? {
              resultString: APP_CONSTS.measurementNames.temperature,
              resultValue:
                (data.temperature ?? scData.temperature).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.temperature,
            }
          : el.key == "pm10"
          ? {
              resultString: APP_CONSTS.measurementNames.pm10,
              resultValue:
                (data.pm10 ?? scData.pm10).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.pm10,
            }
          : el.key == "humidity"
          ? {
              resultString: APP_CONSTS.measurementNames.humidity,
              resultValue:
                (data.humidity ?? scData.humidity).toFixed(1) ??
                "no data" + " " + APP_CONSTS.unitsOfMeasurement.humidity,
            }
          : res;
      return;
    });
  }

  return (
    <div className="relative h-full w-full">
      <h1 className="absolute text-[190px] font-sans font-semibold top-[-20]">
        {res.resultValue.toLocaleString()}
      </h1>
      <h2 className="absolute text-[34px] font-sans font-extrabold top-48.5">
        {res.resultString.toLocaleString()}
      </h2>
    </div>
  );
};
