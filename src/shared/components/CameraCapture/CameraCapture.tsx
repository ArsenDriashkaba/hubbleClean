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
import { ImageContextType, ImageState } from "../../../context";

const buttonStyles = "absolute bottom-5 left-1/2 transform -translate-x-1/2";

export const videoConstraints = {
  width: 800,
  height: 450,
  facingMode: "user",
};

export type CameraCaptureProps = {
  screenshot?: string;
  setScreenshot: Dispatch<SetStateAction<string | undefined>>;
  imageData: ImageState;
  setImageData: ImageContextType["setImageData"];
  setCroppedImage: Dispatch<SetStateAction<string | undefined>>;
  className?: string;
};

export const CameraCapture: FC<CameraCaptureProps> = ({
  imageData,
  setImageData,
  setCroppedImage,
  screenshot,
  setScreenshot,
  className,
}) => {
  const [devices, setDevices] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(undefined);

  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(
        mediaDevices.filter(({ kind }: { kind: any }) => kind === "videoinput")
      ),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const handleOnCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageCrop = async () => {
    if (!screenshot || !croppedAreaPixels) {
      return;
    }

    const croppedImage = await getCroppedImg(screenshot, croppedAreaPixels);

    setCroppedImage(croppedImage);
    setImageData({
      ...imageData,
      croppedImgSrc: croppedImage,
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className={className}>
        {devices.map((_: any, index: number) => (
          <div key={index}>
            <div
              className={`relative w-[${videoConstraints.width}px] h-[${videoConstraints.height}px] bg-slate-200`}
            >
              {!screenshot ? (
                <Camera
                  height={videoConstraints.height}
                  screenshotFormat="image/jpeg"
                  width={videoConstraints.width}
                  videoConstraints={videoConstraints}
                  hidden={!devices.length}
                >
                  {({ getScreenshot }) => (
                    <button
                      className={buttonStyles}
                      onClick={() => {
                        const screenshot = getScreenshot();

                        setScreenshot(screenshot);
                        setImageData({
                          ...imageData,
                          imageSrc: screenshot,
                        });
                      }}
                    >
                      Capture
                    </button>
                  )}
                </Camera>
              ) : (
                <div className="border-yellow-400 border-4">
                  <img src={screenshot} />
                  <div className={buttonStyles}>
                    <button
                      className="mr-2"
                      onClick={() => setScreenshot(undefined)}
                    >
                      Retake
                    </button>
                    <button onClick={() => setIsOpen(true)}>Crop</button>
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
