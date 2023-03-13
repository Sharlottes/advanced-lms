import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import "../../public/global.css";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default App;
