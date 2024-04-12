import { FC } from "react";
import { useImageContext } from "../../context";

export const QuestionsPage: FC = () => {
  const { imageData } = useImageContext();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>This is a Questions page</h1>
      <h3>Original image</h3>
      <img src={imageData.imageSrc} />
      <h3>Cropped image</h3>
      <img className="w-[800px]" src={imageData.croppedImgSrc} />
    </div>
  );
};
