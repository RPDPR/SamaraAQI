import { Logo } from "@/shared/ui/index";
import { FC } from "react";

export const LogoTile: FC = () => {
  return (
    <div className="w-full h-full lg:border-1 4k:border-1 lg:border-black 4k:border-black lg:rounded-2xl 4k:rounded-4xl overflow-hidden flex flex-row justify-end items-end">
      <div className="relative w-70 h-70 lg:w-67.5 lg:h-67.5 4k:w-135 4k:h-135">
        <Logo />
      </div>
    </div>
  );
};
