import { FC } from "react";
import { APP_CONSTS } from "@/shared/models/index";

export const Header: FC = () => {
  return (
    <div className="w-full h-16 bg-white text-center flex justify-center items-center">
      <div>
        <h1 className="text-black text-[2.05rem] font-bold tracking-[34px]">
          {APP_CONSTS.headerTitle.toLocaleUpperCase()}
        </h1>
      </div>
    </div>
  );
};
