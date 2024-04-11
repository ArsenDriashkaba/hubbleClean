import { useState, useCallback, useEffect } from "react";
import { Camera, CroppArea, Modal } from "..";
import { getCroppedImg } from "../../../utils";

const buttonStyles = "absolute bottom-5 left-1/2 transform -translate-x-1/2";

const videoConstraints = {
  width: 800,
  height: 450,
  facingMode: "user",
};

export const CameraCapture = () => {
  const [screenshot, setScreenshot] = useState<string>();
  const [devices, setDevices] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

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

  const handleOnCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log({ croppedArea, croppedAreaPixels });
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageCrop = async () => {
    console.log({ screenshot, croppedAreaPixels });
    if (!screenshot || !croppedAreaPixels) {
      return;
    }

    const croppedImage = await getCroppedImg(screenshot, croppedAreaPixels);

    setCroppedImage(croppedImage as any);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {devices.map((_: any, index: number) => (
          <div key={index}>
            <div
              className={`relative mb-5 w-fit w-[${videoConstraints.width}px] h-[${videoConstraints.height}px] bg-slate-200`}
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
                      onClick={() => setScreenshot(getScreenshot())}
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
        <img src={croppedImage} className="w-[800px]" />
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
