import { useState, FC } from "react";
import Cropper from "react-easy-crop";

export type CroppAreaProps = {
  imageUrl?: string;
  onCroppComplete: (croppedArea: any, croppedAreaPixels: any) => any;
};

export const CroppArea: FC<CroppAreaProps> = ({
  imageUrl,
  onCroppComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  return (
    <Cropper
      image={imageUrl}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCroppComplete}
      onZoomChange={setZoom}
    />
  );
};
