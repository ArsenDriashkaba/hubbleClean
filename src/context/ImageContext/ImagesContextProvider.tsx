import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ImageTypes } from "./constants";
import { ImagesState, ImageType, ImageContextType, ImageState } from "./types";

const initialImageState = Object.keys(ImageTypes).reduce(
  (acc: ImagesState, key: string): ImagesState => {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useImagesContext = () => useContext(ImagesContext);
