import { FC, useMemo, useState, Fragment } from "react";
import { CameraCapture, videoConstraints } from "../../shared/components";
import { Tab } from "@headlessui/react";
import { ImageType, useImagesContext } from "../../context";
import { routes } from "../../router/routes";
import { Link } from "react-router-dom";
import classnames from "classnames";

export const CapturePage: FC = () => {
  const { imagesState, setImageData } = useImagesContext();

  const [selectedTab, setSelectedTab] = useState<ImageType>("front");
  const [screenshot, setScreenshot] = useState<string>();
  const [_, setCroppedImage] = useState<string | undefined>(undefined);

  const images = useMemo(
    () => Object.values(imagesState).map((image) => image),
    [imagesState]
  );

  return (
    <div className="py-10 px-5">
      <Link to={routes.questions()}>
        <button className="bg-blue-400 mb-3 hover:bg-blue-500">Analyze</button>
      </Link>
      <div>
        <div className="flex items-center relative">
          <CameraCapture
            screenshot={screenshot}
            setScreenshot={setScreenshot}
            imageData={imagesState[selectedTab]}
            setImageData={setImageData}
            setCroppedImage={setCroppedImage}
            className="mr-4"
          />
          <Tab.Group
            defaultIndex={0}
            onChange={(index) => {
              setSelectedTab(images[index].type);
              setScreenshot(undefined);
            }}
          >
            <div className="flex flex-col">
              <Tab.List className="absolute top-0">
                {images.map((image) => (
                  <Tab key={image.type} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={classnames(
                          "bg-transparent hover:bg-white",
                          selected && "underline"
                        )}
                      >
                        {image.name}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="flex-end">
                {images.map((image, index) => (
                  <Tab.Panel key={`${image.type}${index}`}>
                    <img
                      src={imagesState[image.type]?.croppedImgSrc}
                      className={`w-[${videoConstraints.width}px] h-[${videoConstraints.height}px]`}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};
