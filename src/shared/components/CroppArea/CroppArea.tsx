import { useState, FC } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

export type CroppAreaProps = {
  imageUrl?: string;
  onCroppComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
};

export const CroppArea: FC<CroppAreaProps> = ({
  imageUrl,
  onCroppComplete,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  return (
    <Cropper
      classes={{ containerClassName: "" }}
      image={imageUrl}
      crop={crop}
      zoom={zoom}
      aspect={16 / 9}
      maxZoom={10}
      onCropChange={setCrop}
      onCropComplete={onCroppComplete}
      onZoomChange={setZoom}
    />
  );
};
