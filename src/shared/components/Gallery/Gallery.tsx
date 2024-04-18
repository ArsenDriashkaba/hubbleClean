import { FC, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

const zoomConfig = {
  maxZoomPixelRatio: 7,
  zoomInMultiplier: 2,
  doubleTapDelay: 300,
  doubleClickDelay: 300,
  doubleClickMaxStops: 2,
  keyboardMoveDistance: 50,
  wheelZoomDistanceFactor: 100,
  pinchZoomDistanceFactor: 100,
  scrollToZoom: true,
} as const;

type GalleryProps = { slides: SlideImage[] };

export const Gallery: FC<GalleryProps> = ({ slides }) => {
  const [index, setIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!slides.length) {
    return null;
  }

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

  return (
    <>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: () => setIsOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
        }}
        inline={{ className: "w-full h-[450px]" }}
      />
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Zoom, Fullscreen]}
        index={index}
        slides={slides}
        on={{ view: updateIndex }}
        animation={{ zoom: 500 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        zoom={zoomConfig}
      />
    </>
  );
};
