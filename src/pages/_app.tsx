import { useEffect } from "react";
import { useRouter } from "next/router";
import { ScreenWidthProvider } from "../libs/ScreenContext";
import Header from "../components/Header";
import "../styles/globals.css";
import { DigimonsDbProvider } from "../libs/DigimonsDbContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const userId: string = localStorage.getItem("id");
    if (!userId) {
      router.push("/login");
    }
  }, []);

  return (
    <ScreenWidthProvider>
      <Header />
      <DigimonsDbProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </DigimonsDbProvider>
    </ScreenWidthProvider>
  );
}
