import "./App.css";
import { ImagesContextProvider } from "./context";
import { Router } from "./router/Router";

export default function App() {
  return (
    <ImagesContextProvider>
      <Router />
    </ImagesContextProvider>
  );
}
