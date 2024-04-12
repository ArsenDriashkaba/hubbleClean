import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

type ImageState = {
  imageSrc?: string;
  croppedImgSrc?: string;
};

export type ImageContextType = {
  imageData: ImageState;
  setImageData: Dispatch<SetStateAction<ImageState>>;
};

const ImageContext = createContext<ImageContextType>({} as ImageContextType);

type Props = {
  children: ReactNode;
};

export const ImageContextProvider: FC<Props> = ({ children }) => {
  const [imageData, setImageData] = useState<ImageState>({});

  return (
    <ImageContext.Provider value={{ imageData, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
