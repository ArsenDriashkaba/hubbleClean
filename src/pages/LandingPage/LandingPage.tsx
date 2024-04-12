import { FC } from "react";
import { routes } from "../../router/routes";
import { Link } from "react-router-dom";

export const LandingPage: FC = () => {
  return (
    <>
      <h1>This is a Landing page.</h1>
      <Link to={routes.capture()}>Capture</Link>
    </>
  );
};
