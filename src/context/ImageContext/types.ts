import { ImageTypes } from "./constants";

export type ImageType = keyof typeof ImageTypes;

export type ImageName = (typeof ImageTypes)[ImageType];

export type ImageState = {
  imageSrc?: string;
  croppedImgSrc?: string;
  type: ImageType;
  name: ImageName;
};

export type ImagesState = { [K in ImageType]: ImageState };

export type ImageContextType = {
  imagesState: ImagesState;
  setImageData: (value: ImageState) => void;
};
