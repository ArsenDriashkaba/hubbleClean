import classNames from "classnames";
import { FC } from "react";
import Webcam, { WebcamProps } from "react-webcam";

const afterStyles =
  "after:absolute after:animate-pulse after:w-5 after:h-5 after:rounded-full after:bg-red-500 after:top-2 after:left-2";
const beforeStyles =
  "before:absolute before:animate-pulse before:w-5 before:h-5 before:rounded-full before:top-2 before:left-8 before:content-['On'] before:flex before:items-center";

export type CameraProps = Partial<Omit<WebcamProps, "audio">>;

export const Camera: FC<CameraProps> = ({ children, hidden, ...restProps }) => {
  return !hidden ? (
    <div className={classNames("relative", afterStyles, beforeStyles)}>
      <Webcam audio={false} hidden={hidden} {...restProps}>
        {
          ((childrenProps) =>
            typeof children === "function"
              ? children?.(childrenProps)
              : children) as WebcamProps["children"]
        }
      </Webcam>
    </div>
  ) : (
    <div
      className={`w-[${restProps.width}px] h-[${restProps.height}px] text-center`}
    >
      Loading
    </div>
  );
};
