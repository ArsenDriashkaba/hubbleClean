import { FC, useMemo } from "react";
import { useImagesContext } from "../../context";
import { SlideImage } from "yet-another-react-lightbox";
import { Gallery } from "../../shared/components/Gallery/Gallery";

export const QuestionsPage: FC = () => {
  const { imagesState } = useImagesContext();

  const slides = useMemo<SlideImage[]>(
    () =>
      Object.values(imagesState).reduce(
        (acc: SlideImage[], { croppedImgSrc }) =>
          croppedImgSrc
            ? [...acc, { src: croppedImgSrc, width: 800, height: 450 }]
            : acc,
        []
      ),
    [imagesState]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>This is a Questions page</h1>
      <Gallery slides={slides} />
    </div>
  );
};
