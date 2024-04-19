import {
  useState,
  useCallback,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Camera, CroppArea, Modal } from "..";
import { getCroppedImg } from "../../../utils";
import { WebcamProps } from "react-webcam";
import { videoConstraints } from "./constants";
import { Area } from "react-easy-crop";
import {
  ImageContextType,
  ImageState,
} from "../../../context/ImageContext/types";
import { Button, Image } from "../../elements";
import { useScreenSize } from "../../../hooks";

const buttonStyles =
  "absolute bottom-5 left-1/2 transform -translate-x-1/2 flex";

type SetImageState = Dispatch<SetStateAction<string | undefined>>;

export type CameraCaptureProps = {
  screenshot?: string;
  setScreenshot: SetImageState;
  imageData: ImageState;
  setImageData: ImageContextType["setImageData"];
  className?: string;
};

export const CameraCapture: FC<CameraCaptureProps> = ({
  imageData,
  setImageData,
  screenshot,
  setScreenshot,
  className,
}) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const screenSize = useScreenSize();

  const handleVideoDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleVideoDevices);
  }, [handleVideoDevices]);

  const handleOnCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageCrop = async () => {
    if (!screenshot || !croppedAreaPixels) {
      return;
    }

    const croppedImage = await getCroppedImg(screenshot, croppedAreaPixels);

    setImageData({
      ...imageData,
      croppedImgSrc: croppedImage,
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className={className}>
        {devices.map((_: MediaDeviceInfo, index: number) => (
          <div key={index}>
            <div
              className={`relative w-[${videoConstraints.width}px] h-[${videoConstraints.height}px] bg-slate-200`}
            >
              {!screenshot ? (
                <Camera
                  height={screenSize.height}
                  screenshotFormat="image/jpeg"
                  width={screenSize.width}
                  videoConstraints={{
                    width: screenSize.width,
                    height: screenSize.height,
                  }}
                  hidden={!devices.length}
                >
                  {
                    (({ getScreenshot }) => (
                      <Button
                        className={buttonStyles}
                        onClick={() => {
                          const screenshot = getScreenshot() ?? undefined;

                          setScreenshot(screenshot);
                          setImageData({
                            ...imageData,
                            imageSrc: screenshot,
                          });
                        }}
                        variant="secondary"
                      >
                        Capture
                      </Button>
                    )) as WebcamProps["children"]
                  }
                </Camera>
              ) : (
                <div className="border-yellow-400 border-4">
                  <Image src={screenshot} />
                  <div className={buttonStyles}>
                    <Button
                      className="mr-2"
                      size="sm"
                      variant="secondary"
                      onClick={() => setScreenshot(undefined)}
                    >
                      Retake
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsOpen(true)}
                    >
                      Crop
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {screenshot && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleImageCrop}>
          <CroppArea
            imageUrl={screenshot}
            onCroppComplete={handleOnCropComplete}
          />
        </Modal>
      )}
    </>
  );
};
