import { FC } from "react";

const RightArrow: FC = () => {
  return (
    <svg
      className="4k:w-14 4k:h-15 inline-block"
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
  className,
  disabled = false,
  tabIndex = 0,
  onClick,
}: {
  w?: number;
  h?: number;
  fs?: number;
  text?: string;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        width: `${w}px`,
        height: `${h}px`,
        fontSize: `${fs}px`,
      }}
      tabIndex={tabIndex}
      onClick={onClick}
      disabled={disabled}
      className={
        `font-sans font-medium bg-white text-black rounded-3xl lg:rounded-3xl 4k:rounded-full hover:bg-black hover:text-white hover:border-1 hover:border-white cursor-pointer flex items-center justify-between px-7 select-none text-nowrap ` +
        className
      }
    >
      <span>{text}</span>
      <RightArrow />
    </button>
  );
};
