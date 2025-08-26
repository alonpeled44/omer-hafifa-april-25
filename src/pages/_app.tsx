import { useEffect } from "react";
import { useRouter } from "next/router";
import { ScreenWidthProvider } from "../libs/ScreenContext";
import Header from "../components/Header";
import "../styles/globals.css";
import { DigimonsDbProvider } from "../libs/DigimonsDbContext";
import UserProvider, { useUser } from "@/libs/UserContext";

export default function App({ Component, pageProps }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (location.pathname === "/login") {
      if (user) {
        location.pathname = "/";
      }
    } else if (location.pathname === "/") {
      if (!user) {
        location.pathname = "/login";
      }
    }
    router.push(location.pathname);
  }, []);

  return (
    <UserProvider>
      <ScreenWidthProvider>
        <Header />
        <DigimonsDbProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </DigimonsDbProvider>
      </ScreenWidthProvider>
    </UserProvider>
  );
}
