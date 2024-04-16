import classNames from "classnames";
import { FC, ImgHTMLAttributes } from "react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = ({ className, ...restProps }) => {
  return <img className={classNames("", className)} {...restProps} />;
};
