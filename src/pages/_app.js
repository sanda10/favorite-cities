import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Provider } from "../components/ui/provider";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Provider>
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
