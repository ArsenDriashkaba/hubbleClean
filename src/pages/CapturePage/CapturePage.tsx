import { FC, useMemo, useState, Fragment } from "react";
import { CameraCapture } from "../../shared/components";
import { Tab } from "@headlessui/react";
import { useImagesContext } from "../../context";
import { routes } from "../../router/routes";
import classnames from "classnames";
import { ImageType } from "../../context/ImageContext/types";
import { videoConstraints } from "../../shared/components/CameraCapture/constants";
import { Button, Image, NavLink } from "../../shared/elements";

export const CapturePage: FC = () => {
  const { imagesState, setImageData } = useImagesContext();

  const [selectedTab, setSelectedTab] = useState<ImageType>("front");
  const [screenshot, setScreenshot] = useState<string>();

  const images = useMemo(
    () => Object.values(imagesState).map((image) => image),
    [imagesState]
  );

  return (
    <div className="py-10 px-5">
      <Button>
        <NavLink to={routes.questions()}>Analyze</NavLink>
      </Button>

      <div className="mt-10">
        <div className="flex relative">
          <CameraCapture
            screenshot={screenshot}
            setScreenshot={setScreenshot}
            imageData={imagesState[selectedTab]}
            setImageData={setImageData}
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
              <Tab.List className="flex">
                {images.map((image) => (
                  <Tab key={image.type} as={Fragment}>
                    {({ selected }) => (
                      <Button
                        className={classnames(selected && "underline")}
                        variant="ghost"
                      >
                        {image.name}
                      </Button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-auto">
                {images.map((image, index) => (
                  <Tab.Panel key={`${image.type}${index}`}>
                    <Image
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
