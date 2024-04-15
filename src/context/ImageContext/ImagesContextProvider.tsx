import { FC, ReactNode, createContext, useContext, useState } from "react";

export type ImageState = {
  imageSrc?: string;
  croppedImgSrc?: string;
  type: ImageType;
  name: ImageName;
};

const ImageTypes = {
  front: "Front",
  left_side: "Left side",
  right_side: "Right side",
  back: "Back",
} as const;

const initialImageState = Object.keys(ImageTypes).reduce(
  (acc: ImagesState, key: any): ImagesState => {
    const currImg = {
      [key]: {
        type: key,
        name: ImageTypes[key as ImageType],
      },
    };

    return { ...acc, ...currImg };
  },
  {} as ImagesState
);
export type ImageType = keyof typeof ImageTypes;

export type ImageName = (typeof ImageTypes)[ImageType];

export type ImagesState = { [K in ImageType]: ImageState };

export type ImageContextType = {
  imagesState: ImagesState;
  setImageData: (value: ImageState) => void;
};

const ImagesContext = createContext<ImageContextType>({} as ImageContextType);

type Props = {
  children: ReactNode;
};

export const ImagesContextProvider: FC<Props> = ({ children }) => {
  const [imagesState, setImagesState] =
    useState<ImagesState>(initialImageState);

  const setImageData = (value: ImageState) =>
    setImagesState({ ...imagesState, [value.type]: value });

  return (
    <ImagesContext.Provider value={{ imagesState, setImageData }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => useContext(ImagesContext);
