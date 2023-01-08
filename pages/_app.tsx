import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../database/supabase";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <Component {...pageProps}  />
      </Provider>
    </SessionContextProvider>
  );
}
