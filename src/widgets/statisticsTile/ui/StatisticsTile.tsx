"use client";
import { useAQIStore } from "@/app/store/useAQIStore";
import { FC, useEffect, useState } from "react";
import { mutate } from "swr";
import { API_LINKS } from "@/shared/api/index";
import { WAQI } from "../api/WAQI";
import { NeutralButton } from "@/shared/ui/NeutralButton";

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
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 3000);

    if (!mutate(API_LINKS.waqi)) {
      mutate(API_LINKS.sc);
    }
  };

  return (
    <div className="w-full h-full bg-green-300 bg-gradient-to-br from-white to-green-300 border-1 border-black rounded-2xl pl-22.75 grid grid-rows-[1fr_1fr_1.45fr] grid-cols-1">
      <WAQI secondary={false} />
      <WAQI secondary={true} />
      <div className="flex justify-end items-end pb-10 pr-12">
        <NeutralButton
          w={180}
          h={50}
          fs={20}
          text="update"
          onClick={handleClick}
        />
        <UpdatedWhen />
      </div>
    </div>
  );
};
