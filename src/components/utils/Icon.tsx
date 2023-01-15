interface IconProps {
  name: string;
  width?: number;
  height?: number;
  bgColor?: string;
  bgWidth?: number;
  bgHeight?: number;
  bgRounded?: boolean;
}

export function Icon({
  name,
  width,
  height,
  bgColor,
  bgWidth,
  bgHeight,
  bgRounded,
}: IconProps) {
  const path = `./assets/icons/${name}.svg`;
  return (
    <div
      className={`flex items-center justify-center ${
        bgRounded && "rounded-full"
      }`}
      style={{ width: bgWidth, height: bgHeight, backgroundColor: bgColor }}
    >
      <img
        src={path}
        alt={`${name}-icon`}
        width={`${width}px`}
        height={`${height}px`}
      />
    </div>
  );
}
