import { Logo } from "@/shared/ui/index";
import { FC } from "react";

export const LogoTile: FC = () => {
  return (
    <div className="relative w-full h-full border-1 border-black rounded-2xl overflow-hidden">
      <div className="absolute top-25 left-15">
        <Logo />
      </div>
    </div>
  );
};
