import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Button } from "../../elements";
import { useNavigate } from "react-router-dom";

type PageProps = {
  backButton?: boolean | string;
  className?: string;
  title?: ReactNode;
  children?: ReactNode;
};

export const Page: FC<PageProps> = ({
  backButton,
  className,
  title,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center w-full bg-indigo-800 text-white">
        {backButton && (
          <Button
            variant="secondary"
            onClick={() =>
              typeof backButton === "string"
                ? navigate(backButton)
                : navigate(-1)
            }
          >
            Back
          </Button>
        )}
        {title}
      </div>
      <div className={classNames("pb-10 px-5", className)}>{children}</div>
    </>
  );
};
