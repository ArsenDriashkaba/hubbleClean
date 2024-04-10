import { useState, useCallback, useEffect } from "react";
import { Camera, CroppArea, Modal } from "..";

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

  return (
    <>
      <div className="flex items-center justify-center">
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
      </div>
      {screenshot && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <CroppArea
            imageUrl={screenshot}
            onCroppComplete={(croppedArea: any, croppedAreaPixels: any) => {}}
          />
        </Modal>
      )}
    </>
  );
};
