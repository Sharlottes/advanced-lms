import type { AppProps } from "next/app";
import Head from "next/head";

import CssBaseline from "@mui/material/CssBaseline";

import TodoListContextProvider from "@/contexts/TodoListContextProvider";
import LoginContextProvider from "@/contexts/LoginContextProvider";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import "../../public/global.css";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <>
    <Head>
      <title>LMS Dashboard</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <SessionProvider session={session}>
      <LoginContextProvider>
        <TodoListContextProvider>
          <CssBaseline />
          <SnackbarProvider preventDuplicate>
            <Component {...pageProps} />
          </SnackbarProvider>
        </TodoListContextProvider>
      </LoginContextProvider>
    </SessionProvider>
  </>
);

export default App;
