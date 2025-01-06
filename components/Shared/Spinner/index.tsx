import { FC } from "react";

interface SpinnerProps {
  width?: number;
  height?: number;
  color?: string;
  margin?: string;
}

const Spinner: FC<SpinnerProps> = ({ width, height, color, margin }) => (
  <div className="w-full flex items-center justify-center">
    <div
      className="animate-spin rounded-full"
      style={{
        width: width || "24px",
        height: height || "24px",
        border: `2px solid ${color || "white"}` || "",
        borderTop: "2px solid transparent",
        margin: margin || "0",
      }}
    >
      <div className="" />
    </div>
  </div>
);

export default Spinner;
