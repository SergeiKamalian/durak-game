import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./constants";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Tektur", sans-serif;
  }

button,
input {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}

input:-webkit-autofill {
  transition: background-color 500000s ease-in-out 0s, color 500000s ease-in-out 0s, ;
}
  #root {
  min-height: 100svh;
  max-height: 100svh;
  min-width: 100svw;
  max-width: 100svw;
  background: black;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle, #22242f, #12141e);
}

#root::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('wallpaper.webp');
  background-size: cover;
  background-position: inherit;
  filter: blur(7px); 
}

#root::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, #22242f, #12141e);
  z-index: 0;
  opacity: 0.5;
}

`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
