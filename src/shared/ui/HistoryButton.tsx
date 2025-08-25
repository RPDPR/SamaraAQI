import { FC } from "react";

const RightArrow: FC = () => {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.5 14.2521L18.6667 8.41879M24.5 14.2521L18.6667 20.0855M24.5 14.2521H3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HistoryButton = ({
  w,
  h,
  fs,
  text,
  onClick,
}: {
  w: number;
  h: number;
  fs: number;
  text?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        width: `${w}px`,
        height: `${h}px`,
        fontSize: `${fs}px`,
      }}
      onClick={onClick}
      className={`font-sans font-semibold bg-white text-black rounded-3xl hover:bg-black hover:text-white hover:border-1 hover:border-white cursor-pointer flex items-center justify-between px-7 select-none`}
    >
      <span>{text}</span>
      <RightArrow />
    </button>
  );
};
