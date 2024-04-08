import { useState, useCallback, useEffect } from "react";
import { Camera, CroppArea } from "..";

const videoConstraints = {
  width: 800,
  height: 450,
  facingMode: "user",
};

export const CameraCapture = () => {
  const [screenshot, setScreenshot] = useState<string>();
  const [devices, setDevices] = useState<any>([]);

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
            <img src={screenshot} />
            {screenshot && (
              <CroppArea
                imageUrl={screenshot}
                onCroppComplete={(croppedArea: any, croppedAreaPixels: any) => {
                  console.log(croppedArea, croppedAreaPixels);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};
