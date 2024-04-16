import { FC } from "react";
import { useImagesContext } from "../../context";
import { ImageState } from "../../context/ImageContext/types";
import { Image } from "../../shared/elements";

export const QuestionsPage: FC = () => {
  const { imagesState } = useImagesContext();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>This is a Questions page</h1>
      {Object.values(imagesState)?.map(
        ({ imageSrc, croppedImgSrc }: ImageState) =>
          imageSrc && croppedImgSrc ? (
            <>
              <h3>Original image</h3>
              <Image src={imageSrc} />
              <h3>Cropped image</h3>
              <Image className="w-[800px]" src={croppedImgSrc} />
            </>
          ) : null
      )}
    </div>
  );
};
