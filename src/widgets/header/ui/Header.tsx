import { FC } from "react";
import { APP_CONSTS } from "@/shared/models/index";

export const Header: FC = () => {
  return (
    <div className="w-full sticky top-0 z-100 h-20 lg:h-20 bg-white text-center flex justify-center items-center">
      <div>
        <h1 className="text-black text-[37px] lg:text-[2.05rem] font-sans font-bold tracking-[18px] lg:tracking-[34px]">
          {APP_CONSTS.headerTitle.toLocaleUpperCase()}
        </h1>
      </div>
    </div>
  );
};
