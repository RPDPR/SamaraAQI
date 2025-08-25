import { FC } from "react";
import { APP_CONSTS } from "@/shared/models/index";

export const IndicationTile: FC = () => {
  return (
    <div className="w-full h-full text-left font-sans font-medium bg-green-300 rounded-2xl flex flex-col justify-between px-15 pt-6.5">
      <h1 className="text-[75px]">{APP_CONSTS.indicationTile.title1}</h1>
      <h2>{APP_CONSTS.indicationTile.desc1}</h2>
    </div>
  );
};
