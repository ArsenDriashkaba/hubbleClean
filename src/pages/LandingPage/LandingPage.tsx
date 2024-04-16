import { FC } from "react";
import { routes } from "../../router/routes";
import { NavLink } from "../../shared/elements";

export const LandingPage: FC = () => {
  return (
    <>
      <h1>This is a Landing page.</h1>
      <NavLink to={routes.capture()}>Capture</NavLink>
    </>
  );
};
