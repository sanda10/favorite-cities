import { SessionProvider } from "next-auth/react";
import { Provider } from "../components/ui/provider";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

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
