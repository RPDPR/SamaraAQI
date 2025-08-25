"use client";
import { FC } from "react";
import { WAQI } from "../api/WAQI";

export const StatisticsTile: FC = () => {
  return (
    <div className="w-full h-full bg-green-300 bg-gradient-to-br from-white to-green-300 border-1 border-black rounded-2xl px-22.75 grid grid-rows-[1fr_1fr_1.45fr] grid-cols-1">
      <WAQI secondary={false} />
      <WAQI secondary={true} />
      <div></div>
    </div>
  );
};
