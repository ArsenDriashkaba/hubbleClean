/* eslint-disable @typescript-eslint/no-explicit-any */
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
