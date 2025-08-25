export const NeutralButton = ({
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
      className={`font-sans font-semibold bg-black text-white rounded-3xl hover:bg-white hover:text-black hover:border-1 hover:border-black cursor-pointer flex items-center justify-between px-7 select-none`}
    >
      <span>{text}</span>
    </button>
  );
};
