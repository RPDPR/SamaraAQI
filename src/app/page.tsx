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
    <div className="w-full h-full">
      <div className="w-full h-full lg:grid lg:grid-cols-[1.98fr_3.02fr] lg:grid-rows-[5.6fr_4.4fr] lg:gap-10 flex flex-col pb-5">
        <div className="w-full h-full">
          <IndicationTile />
        </div>
        <div className="w-full h-full lg:row-span-2 order-2 lg:order-none">
          <StatisticsTile />
        </div>
        <div className="w-full h-full lg:grid lg:grid-cols-2 lg:gap-9 lg:pb-1 flex flex-col gap-4 order-3 lg:order-none">
          <HistoryTile />
          <LogoTile />
        </div>
      </div>
    </div>
  );
}
