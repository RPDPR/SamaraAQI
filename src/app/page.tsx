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
      <div className="w-full h-full mx-auto lg:mx-auto 2k:mx-auto 4k:mx-auto lg:grid lg:grid-cols-[1.98fr_3.02fr] lg:grid-rows-[5.6fr_4.4fr] lg:gap-10 4k:gap-20 flex flex-col lg:pb-5 4k:pb-10">
        <div className="w-full h-full mx-auto lg:mx-auto 2k:mx-auto 4k:mx-auto lg:order-none 4k:order-none max-h-[280px] lg:max-h-full 4k:max-h-full min-h-[280px] lg:min-h-0 4k:min-h-0">
          <IndicationTile />
        </div>
        <div className="w-full h-full mx-auto lg:mx-auto 2k:mx-auto 4k:mx-auto lg:row-span-2 4k:row-span-2 order-2 lg:order-none 4k:order-none min-h-[450px] lg:min-h-0 4k:min-h-0">
          <StatisticsTile />
        </div>
        <div className="w-full h-full mx-auto lg:mx-auto 2k:mx-auto 4k:mx-auto lg:grid lg:grid-cols-2 lg:gap-10 4k:gap-20 lg:pb-1 4k:pb-2 flex flex-col order-3 lg:order-none">
          <div className="min-h-[297px] lg:min-h-0 4k:min-h-0">
            <HistoryTile />
          </div>
          <div className="min-h-[337px] lg:min-h-0 4k:min-h-0">
            <LogoTile />
          </div>
        </div>
      </div>
    </div>
  );
}
