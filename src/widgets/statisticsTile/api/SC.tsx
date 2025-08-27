"use client";
import { useEffect, useState } from "react";
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
  const scStoreData_pm25 = useAQIStore((state) => state.scData.pm25);
  const scStoreData_pm10 = useAQIStore((state) => state.scData.pm10);
  const scStoreData_temperature = useAQIStore(
    (state) => state.scData.temperature
  );
  const scStoreData_humidity = useAQIStore((state) => state.scData.humidity);
  const lastUpdated = useAQIStore((state) => state.lastUpdated);
  const updateScData = useAQIStore((state) => state.updateScData);

  const {
    data: scData,
    error,
    isLoading,
    mutate,
  } = useSWR(API_LINKS.sc, fetcherSC, {
    refreshInterval: API_FETCH_INTERVAL,
  });

  const pm25 = scData?.pm25 ?? scStoreData_pm25 ?? null;
  const pm10 = scData?.pm10 ?? scStoreData_pm10 ?? null;
  const temperature = scData?.temperature ?? scStoreData_temperature ?? null;
  const humidity = scData?.humidity ?? scStoreData_humidity ?? null;

  const [res, setRes] = useState<{
    resultString: string;
    resultValue: string;
  }>({ resultString: "", resultValue: "" });

  useEffect(() => {
    const shouldUpdate =
      pm25 !== scStoreData_pm25 ||
      pm10 !== scStoreData_pm10 ||
      temperature !== scStoreData_temperature ||
      humidity !== scStoreData_humidity;

    if (shouldUpdate) {
      updateScData({ pm10, pm25, temperature, humidity });
    }

    let res: { resultString: string; resultValue: string } = {
      resultString: "",
      resultValue: "",
    };

    if (!secondary) {
      res.resultString = APP_CONSTS.measurementName.aqi;
      const aqi = pm25 != null ? convertPM25ToAQI(pm25) : null;
      res.resultValue = aqi != null ? aqi.toFixed(0) : "no data";
    } else {
      console.log(lastUpdated);
      if (lastUpdated != null && Object.keys(lastUpdated).length) {
        console.log("LAST UPDATED!");
        res =
          lastUpdated.key === "pm25" && pm25 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${pm25.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : lastUpdated.key === "temperature" && temperature != null
            ? {
                resultString: APP_CONSTS.measurementName.temperature,
                resultValue: `${temperature.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.temperature
                }`,
              }
            : lastUpdated.key === "pm10" && pm10 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${pm10.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : lastUpdated.key === "humidity" && humidity != null
            ? {
                resultString: APP_CONSTS.measurementName.humidity,
                resultValue: `${humidity.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.humidity
                }`,
              }
            : { resultString: "", resultValue: "no data" };
      } else {
        console.log("НЕ LAST UPDATED!");
        res =
          pm25 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${pm25.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : temperature != null
            ? {
                resultString: APP_CONSTS.measurementName.temperature,
                resultValue: `${temperature.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.temperature
                }`,
              }
            : pm10 != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${pm10.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : humidity != null
            ? {
                resultString: APP_CONSTS.measurementName.humidity,
                resultValue: `${humidity.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.humidity
                }`,
              }
            : { resultString: "", resultValue: "no data" };
      }
    }
    setRes(res);
  }, [
    pm25,
    pm10,
    temperature,
    humidity,
    lastUpdated,
    secondary,
    scStoreData_pm25,
    scStoreData_pm10,
    scStoreData_temperature,
    scStoreData_humidity,
    updateScData,
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
  if (!scData)
    return (
      <div className="relative h-full w-full">
        <h1 className="absolute text-[34px] font-sans font-extrabold top-48.5">
          no data
        </h1>
      </div>
    );

  return (
    <div className="relative h-full w-full">
      <h1 className="absolute lg:text-[200px] font-sans font-semibold lg:top-[-10] lg:left-[7px] lg:tracking-[-13px]">
        {res.resultValue ? res.resultValue.toLocaleString() : "no data"}
      </h1>
      <h2 className="absolute lg:text-[40px] font-sans font-bold lg:top-54.5 lg:left-[7px] lg:tracking-[-2.8px]">
        {res.resultString ? res.resultString.toLocaleString() : ""}
      </h2>
    </div>
  );
};
