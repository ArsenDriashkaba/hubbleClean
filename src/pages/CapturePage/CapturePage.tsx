import { FC, useMemo, useState } from "react";
import { CameraCapture } from "../../shared/components";
import { Tab } from "@headlessui/react";
import { ImageType, useImagesContext } from "../../context";
import { routes } from "../../router/routes";
import { Link } from "react-router-dom";

export const CapturePage: FC = () => {
  const { imagesState, setImageData } = useImagesContext();

  const [selectedTab, setSelectedTab] = useState<ImageType>("front");
  const images = useMemo(
    () => Object.values(imagesState)?.map((image) => image),
    [imagesState]
  );

  return (
    <>
      <Link to={routes.questions()}>Analyze</Link>
      <Tab.Group
        defaultIndex={0}
        onChange={(index) => setSelectedTab(images?.[index].type)}
      >
        <Tab.List>
          {images.map((image) => (
            <Tab key={image.type}>
              {({ selected }) => (
                <p className={selected ? "underline" : ""}>{image.name}</p>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {images.map((image, index) => (
            <Tab.Panel key={`${image.type}${index}`}>
              <CameraCapture imageData={image} setImageData={setImageData} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
