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
    error: scError,
    isLoading: scIsLoading,
    mutate: scMutate,
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
      if (lastUpdated != null && Object.keys(lastUpdated).length) {
        res =
          lastUpdated.key === "pm25" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.pm25,
                resultValue: `${lastUpdated.value.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm25
                }`,
              }
            : lastUpdated.key === "temperature" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.temperature,
                resultValue: `${lastUpdated.value.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.temperature
                }`,
              }
            : lastUpdated.key === "pm10" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.pm10,
                resultValue: `${lastUpdated.value.toFixed(1)} ${
                  APP_CONSTS.unitsOfMeasurement.pm10
                }`,
              }
            : lastUpdated.key === "humidity" && lastUpdated.value != null
            ? {
                resultString: APP_CONSTS.measurementName.humidity,
                resultValue: `${lastUpdated.value.toFixed(0)} ${
                  APP_CONSTS.unitsOfMeasurement.humidity
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

  if (scError)
    return (
      <div className="relative w-110 h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 px-9 lg:px-0 2k:px-0 4k:px-0">
        <h1 className="absolute text-[34px] lg:text-[34px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-48.5 4k:top-97 lg:px-0 4k:px-0">
          {APP_CONSTS.errorMessage.failedToFetch}
        </h1>
        <div className="absolute text-[34px] lg:text-[34px] 4k:text-[68px] hidden lg:block 4k:hidden font-sans font-extrabold lg:top-49.75 lg:left-90">
          <TryAgainButton
            w={160}
            h={40}
            fs={20}
            text="try again"
            onClick={() => {
              scMutate();
            }}
          />
        </div>
        <div className="absolute text-[68px] hidden lg:hidden 4k:block font-sans font-extrabold 4k:top-99.5 4k:left-180">
          <TryAgainButton
            w={320}
            h={80}
            fs={40}
            text="try again"
            onClick={() => {
              scMutate();
            }}
            className="4k:px-14"
          />
        </div>
      </div>
    );
  if (scIsLoading)
    return (
      <div className="relative w-110 h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 px-9 lg:px-0 2k:px-0 4k:px-0">
        <h1 className="absolute text-[34px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-48.5 4k:top-97 lg:px-0 4k:px-0">
          loading...
        </h1>
      </div>
    );
  if (pm25 == null && pm10 == null && temperature == null && humidity == null)
    return (
      <div className="relative w-110 h-full mx-auto lg:0 2k:mx-0 4k:mx-0 px-9 lg:px-0 2k:px-0 4k:px-0">
        <h1 className="absolute text-[34px] 4k:text-[68px] font-sans font-extrabold top-15 lg:top-48.5 4k:top-97 lg:px-0 4k:px-0">
          no data
        </h1>
      </div>
    );

  return (
    <div className="relative w-110 h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 min-h-[149.5px] 4k:min-h-[299px]">
      <h1 className="absolute text-[80px] lg:text-[200px] 4k:text-[400px] font-sans font-semibold top-[10] lg:top-[-10] 4k:top-[-20] lg:left-[7px] 4k:left-[14px] tracking-[-5px] lg:tracking-[-11px] 4k:tracking-[-22px] text-nowrap">
        {res.resultValue ? res.resultValue.toLocaleString() : "no data"}
      </h1>
      <h2 className="absolute text-[40px] lg:text-[40px] 4k:text-[80px] font-sans font-bold top-[110px] lg:top-54.5 4k:top-109 lg:left-[7px] 4k:left-[14px] tracking-[-2.7px] lg:tracking-[-2.8px] 4k:tracking-[-5.6px] lg:w-60 4k:w-120">
        {res.resultString ? res.resultString.toLocaleString() : ""}
      </h2>
    </div>
  );
};
