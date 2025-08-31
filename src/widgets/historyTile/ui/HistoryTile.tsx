"use client";
import { FC, useState, useCallback } from "react";
import { APP_CONSTS } from "@/shared/models/index";
import { HistoryButton } from "@/shared/ui/index";

export const HistoryTile: FC = () => {
  const [dushnota, setDushnota] = useState<number>(0);

  return (
    <div className="w-full h-full mx-auto lg:mx-0 2k:mx-0 4k:mx-0 bg-black lg:rounded-2xl 4k:rounded-4xl flex flex-col justify-between px-10 lg:px-5 4k:px-10 pt-8 lg:pt-12 4k:pt-24 pb-10 lg:pb-9 4k:pb-18">
      <div className="w-110 mx-auto lg:mx-0 2k:mx-0 4k:mx-0 text-white text-left font-sans font-medium text-[55px] lg:text-[55px] 4k:text-[110px] leading-[100%] lg:leading-[100%] 4k:leading-[100%]">
        <h1 className="tracking-[-4px] lg:tracking-[-4px] 4k:tracking-[-8px]">
          {APP_CONSTS.historyTile.title1}
        </h1>
        <h1 className="tracking-[-3px] lg:tracking-[-3px] 4k:tracking-[-6px]">
          {APP_CONSTS.historyTile.title2} {dushnota}
        </h1>
      </div>
      <div className="w-110 mx-auto lg:mx-0 2k:mx-0 4k:mx-0">
        <HistoryButton
          w={296}
          h={63.65}
          fs={25}
          className="4k:hidden font-bold rounded-[100px] lg:rounded-[100px] tracking-[-1px] lg:tracking-[-1px]"
          text={APP_CONSTS.historyTile.history}
          onClick={useCallback(() => {
            if (dushnota >= 9) return;
            setDushnota((prev) => prev + 1);
          }, [dushnota])}
        />
        <HistoryButton
          w={592}
          h={127.3}
          fs={50}
          className="hidden 4k:inline-flex font-bold 4k:rounded-[200px] 4k:tracking-[-2px] 4k:px-14 4k:text-nowrap"
          text={APP_CONSTS.historyTile.history}
          onClick={useCallback(() => {
            if (dushnota >= 9) return;
            setDushnota((prev) => prev + 1);
          }, [dushnota])}
        />
      </div>
    </div>
  );
};
