import { useEffect } from "react";
import { useRouter } from "next/router";
import { ScreenWidthProvider } from "../libs/screenContext";
import Header from "../components/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/login");
    }
  }, []);

  return (
    <ScreenWidthProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </ScreenWidthProvider>
  );
}
