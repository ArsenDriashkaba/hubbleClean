import "./App.css";
import { ImageContextProvider } from "./context";
import { Router } from "./router/Router";

export default function App() {
  return (
    <ImageContextProvider>
      <Router />
    </ImageContextProvider>
  );
}
