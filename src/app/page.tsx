import type { Metadata } from "next";

import { StatisticsTile } from "@/widgets/statisticsTile/index";
import { IndicationTile } from "@/widgets/indicationTile/index";
import { HistoryTile } from "@/widgets/historyTile/index";
import { LogoTile } from "@/widgets/logoTile/index";

export const metadata: Metadata = {
  title: "Samara AQI",
  description: "Samara AQI client app",
};

export default function Home() {
  return (
    <div className="2xl:h-390 lg:h-208.5 pt-2 pb-2 grid grid-cols-[39.6fr_60.4fr] grid-rows-1 gap-[35px]">
      <div className="w-full h-full grid grid-cols-1 grid-rows-[56.2fr_43.8fr] gap-[35px]">
        <div className="w-full h-full">
          <IndicationTile />
        </div>
        <div className="w-full h-full grid grid-cols-2 gap-9 pb-1">
          <HistoryTile />
          <LogoTile />
        </div>
      </div>
      <div className="w-full h-full">
        <StatisticsTile />
      </div>
    </div>
  );
}
