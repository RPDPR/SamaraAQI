"use client";
import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { useAQIStore } from "@/app/store/useAQIStore";
import useSWR from "swr";
import { WAQI } from "../api/WAQI";
import { NeutralButton, TryAgainButton } from "@/shared/ui/index";
import {
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

export const UpdatedWhen: FC = () => {
  const lastUpdatedTime = useAQIStore((state) => state.lastUpdatedTime);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdatedTime]);

  if (now === null || !lastUpdatedTime) {
    return <h1>{`updated...`}</h1>;
  }

  const deltaSec = Math.floor((now - lastUpdatedTime) / 1000);

  return (
    <div>
      <h1 className="font-sans font-bold text-md lg:text-3xl 4k:text-[60px]">{`updated ${deltaSec} sec ago...`}</h1>
    </div>
  );
};

export const StatisticsTile: FC = () => {
  const token = process.env.NEXT_PUBLIC_WAQI_API_TOKEN;

  const waqiStoreData_aqi = useAQIStore((state) => state.waqiData.aqi);
  const waqiStoreData_pm25 = useAQIStore((state) => state.waqiData.pm25);
  const waqiStoreData_pm10 = useAQIStore((state) => state.waqiData.pm10);
  const scStoreData_pm25 = useAQIStore((state) => state.scData.pm25);
  const scStoreData_pm10 = useAQIStore((state) => state.scData.pm10);
  const scStoreData_temperature = useAQIStore(
    (state) => state.scData.temperature
  );
  const scStoreData_humidity = useAQIStore((state) => state.scData.humidity);

  const {
    data: waqiData,
    error: waqiError,
    isLoading: waqiIsLoading,
    mutate: waqiMutate,
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
    mutate: scMutate,
  } = useSWR<FetchSchema_SC>(
    !waqiData && waqiError ? API_LINKS.sc : null,
    fetcherSC,
    {
      refreshInterval: API_FETCH_INTERVAL,
      revalidateOnMount: false,
      dedupingInterval: 2000,
    }
  );

  const [disabled, setDisabled] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;

    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);

    waqiMutate();
    scMutate();
  }, [disabled, waqiMutate, scMutate]);

  const aqi = waqiData?.aqi ?? waqiStoreData_aqi;
  const pm25 =
    waqiData?.pm25 ?? waqiStoreData_pm25 ?? scData?.pm25 ?? scStoreData_pm25;
  const pm10 =
    waqiData?.pm10 ?? waqiStoreData_pm10 ?? scData?.pm10 ?? scStoreData_pm10;
  const temperature = scData?.temperature ?? scStoreData_temperature;
  const humidity = scData?.humidity ?? scStoreData_humidity;

  const hasAnyData: boolean =
    !!aqi || !!pm25 || !!pm10 || !!temperature || !!humidity;

  const indication = useMemo<I_Indication>(() => {
    const newAqi = aqi ?? (pm25 ? convertPM25ToAQI(pm25) : null);
    return getIndication(newAqi);
  }, [aqi, pm25]);

  return (
    <div
      className={
        "w-full h-full lg:border-1 4k:border-1 lg:border-black 4k:border-black lg:rounded-2xl 4k:lg:rounded-4xl lg:pl-22.75 4k:pl-45.5 flex flex-col justify-between overflow-x-hidden"
      }
      style={{
        backgroundImage: `linear-gradient(to bottom right, white, ${
          indication.color ? indication.color : "#ffffff"
        })`,
      }}
    >
      <div className="w-full min-h-80 lg:min-h-130 4k:min-h-260 flex flex-col justify-between">
        <WAQI secondary={false} />
        <WAQI secondary={true} />
      </div>
      {((waqiError || scError) && !hasAnyData) ||
      ((waqiError || scError) &&
        !hasAnyData &&
        (waqiIsLoading || scIsLoading)) ? (
        <div className="flex flex-row justify-between items-end pb-6 px-6 lg:pb-10 4k:pb-20 lg:pr-12 4k:pr-24 mt-auto">
          <TryAgainButton
            w={160}
            h={40}
            fs={16}
            text="try again"
            disabled={disabled}
            className="lg:hidden 4k:hidden"
            onClick={handleClick}
          />
        </div>
      ) : (
        <div className="flex justify-between items-end pb-6 lg:pb-10 4k:pb-20 px-6 lg:px-6 4k:px-12 lg:pr-12 4k:pr-24">
          <NeutralButton
            w={360}
            h={100}
            fs={40}
            text="update"
            disabled={disabled}
            className="hidden lg:hidden 4k:block text-left 4k:text-left rounded-full px-14"
            onClick={handleClick}
          />
          <NeutralButton
            w={180}
            h={50}
            fs={20}
            text="update"
            disabled={disabled}
            className="hidden lg:block 4k:hidden text-left lg:text-left"
            onClick={handleClick}
          />
          <NeutralButton
            w={160}
            h={40}
            fs={16}
            text="update"
            disabled={disabled}
            className="lg:hidden 4k:hidden"
            onClick={handleClick}
          />
          <UpdatedWhen />
        </div>
      )}
    </div>
  );
};
