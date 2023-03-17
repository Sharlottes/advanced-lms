import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import TodoListContextProvider from "@/contexts/TodoListContextProvider";

import "../../public/global.css";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TodoListContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </TodoListContextProvider>
    </SessionProvider>
  );
};

export default App;
