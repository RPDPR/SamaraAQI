"use client";
import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { useAQIStore } from "@/app/store/useAQIStore";
import useSWR, { mutate } from "swr";
import { WAQI } from "../api/WAQI";
import { NeutralButton } from "@/shared/ui/NeutralButton";
import {
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
      <h1 className="font-sans font-bold text-3xl">{`updated ${deltaSec} sec ago...`}</h1>
    </div>
  );
};

export const StatisticsTile: FC = () => {
  const waqiStoreData = useAQIStore((state) => state.waqiData);
  const scStoreData = useAQIStore((state) => state.scData);

  const { data: waqiData, error: waqiError } = useSWR<FetchSchema_WAQI>(
    API_LINKS.waqi,
    fetcherWAQI,
    {
      refreshInterval: API_FETCH_INTERVAL,
    }
  );
  const { data: scData, error: scError } = useSWR<FetchSchema_SC>(
    !waqiData && waqiError ? API_LINKS.sc : null,
    fetcherSC,
    {
      refreshInterval: API_FETCH_INTERVAL,
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [disabled, setDisabled] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;

    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);

    mutate(API_LINKS.waqi, undefined, {
      revalidate: true,
    });
    mutate(API_LINKS.sc, undefined, { revalidate: true });
  }, [disabled]);

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

  return (
    <div
      className={
        "w-full h-full lg:border-1 lg:border-black lg:rounded-2xl sm:lg:pl-22.75 lg:pl-22.75 grid grid-rows-[1fr_1fr_1.45fr] grid-cols-1"
      }
      style={{
        backgroundImage: `linear-gradient(to bottom right, white, ${
          indication.color ? indication.color : "#ffffff"
        })`,
      }}
    >
      <WAQI secondary={false} />
      <WAQI secondary={true} />
      {waqiError && scError ? (
        <div className="flex justify-between items-end pb-10 pr-12"></div>
      ) : (
        <div className="flex justify-between items-end pb-10 pr-12">
          {" "}
          <NeutralButton
            w={180}
            h={50}
            fs={20}
            text="update"
            disabled={disabled}
            onClick={handleClick}
          />
          <UpdatedWhen />
        </div>
      )}
    </div>
  );
};
