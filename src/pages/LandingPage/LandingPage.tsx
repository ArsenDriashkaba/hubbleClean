import { FC } from "react";
import { routes } from "../../router/routes";
import { Button, NavLink } from "../../shared/elements";
import { Page } from "../../shared/components";

export const LandingPage: FC = () => {
  return (
    <Page title={<h1>This is a Landing page.</h1>}>
      <Button>
        <NavLink to={routes.capture()}>Capture</NavLink>
      </Button>
    </Page>
  );
};
