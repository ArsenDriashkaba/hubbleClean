import { useState, useCallback, useEffect } from "react";
import { Camera, CroppArea, Modal } from "..";

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
      <>
        {devices.map((_: any, index: number) => (
          <div key={index}>
            <Camera
              height={450}
              screenshotFormat="image/jpeg"
              width={800}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <button onClick={() => setScreenshot(getScreenshot())}>
                  Capture photo
                </button>
              )}
            </Camera>
            <div>
              <img src={screenshot} onClick={() => setIsOpen(true)} />
            </div>
          </div>
        ))}
      </>
      {screenshot && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <CroppArea
            imageUrl={screenshot}
            onCroppComplete={(croppedArea: any, croppedAreaPixels: any) => {
              console.log(croppedArea, croppedAreaPixels);
            }}
          />
        </Modal>
      )}
    </>
  );
};
