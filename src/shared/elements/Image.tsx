import classNames from "classnames";
import { FC, ImgHTMLAttributes } from "react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = ({ className, src, ...restProps }) => {
  return src ? (
    <img src={src} className={classNames("", className)} {...restProps} />
  ) : (
    <div className="w-full h-full my-auto bg-slate-100 text-slate-500 flex items-center justify-center text-lg border-dashed border-2">
      Picture placeholder
    </div>
  );
};
