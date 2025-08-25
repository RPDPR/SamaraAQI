"use client";
import { FC, useState } from "react";
import { APP_CONSTS } from "@/shared/models/index";
import { HistoryButton } from "@/shared/ui/index";

export const HistoryTile: FC = () => {
  const [dushnota, setDushnota] = useState(0);

  return (
    <div className="w-full h-full bg-black rounded-2xl px-4 flex flex-col justify-between pb-8">
      <div className="text-white font-sans text-[48px] leading-13 pt-10">
        <h1 className="tracking-[-3px]">{APP_CONSTS.historyTile.title1}</h1>
        <h1 className="tracking-[-1px]">
          {APP_CONSTS.historyTile.title2} {dushnota}
        </h1>
      </div>
      <div className="">
        <HistoryButton
          w={263}
          h={55}
          fs={20}
          text={APP_CONSTS.historyTile.history}
          onClick={() => {
            if (dushnota >= 9) return;
            setDushnota((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
};
