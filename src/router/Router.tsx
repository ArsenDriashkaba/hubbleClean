import { FC } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes";
import { LandingPage } from "../pages/LandingPage";
import { CapturePage } from "../pages/CapturePage";
import { QuestionsPage } from "../pages/QuestionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LandingPage />} path={routes.index()} />
      <Route element={<CapturePage />} path={routes.capture()} />
      <Route element={<QuestionsPage />} path={routes.questions()} />
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
