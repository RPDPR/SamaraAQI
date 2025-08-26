export const NeutralButton = ({
  w,
  h,
  fs,
  text,
  className,
  disabled = false,
  onClick,
}: {
  w: number;
  h: number;
  fs: number;
  text?: string;
  className?: string;
  disabled?: boolean;
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
      disabled={disabled}
      className={
        `font-sans font-semibold bg-black text-white rounded-3xl hover:bg-white hover:text-black hover:border-1 hover:border-black cursor-pointer flex items-center justify-between px-7 select-none disabled:bg-neutral-300 disabled:text-black disabled:cursor-default disabled:border-1 disabled:border-black ` +
        className
      }
    >
      <span>{text}</span>
    </button>
  );
};
