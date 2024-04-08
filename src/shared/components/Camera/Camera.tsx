import { FC, ReactNode } from "react";
import Webcam, { WebcamProps } from "react-webcam";
type ChildrenType = (childrenProps: any) => ReactNode;

export type CameraProps = Partial<Omit<WebcamProps, "audio" | "children">> & {
  children?: ReactNode | ChildrenType;
};

export const Camera: FC<CameraProps> = ({ children, ...restProps }) => {
  return (
    <Webcam audio={false} {...restProps}>
      {(childrenProps) =>
        typeof children === "function" ? children?.(childrenProps) : children
      }
    </Webcam>
  );
};
