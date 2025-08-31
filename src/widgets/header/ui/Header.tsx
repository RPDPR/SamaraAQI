import { FC } from "react";
import { APP_CONSTS } from "@/shared/models/index";

export const Header: FC = () => {
  return (
    <div className="w-full mx-auto sticky top-0 z-100 h-20 lg:h-20 4k:h-40 min-h-20 lg:min-h-20 4k:min-h-40 bg-white text-center flex justify-center items-center px-14 lg:px-0 4k:px-0">
      <div className="w-full">
        <h1 className="text-black text-[23px] lg:text-[37px] 4k:text-[74px] font-sans font-bold leading-[100%] lg:leading-none tracking-[18px] lg:tracking-[34px] 4k:tracking-[68px]">
          {APP_CONSTS.headerTitle.toLocaleUpperCase()}
        </h1>
      </div>
    </div>
  );
};
