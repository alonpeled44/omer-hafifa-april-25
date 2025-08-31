import { useEffect } from "react";
import { useRouter } from "next/router";
import { ScreenWidthProvider } from "../libs/ScreenContext";
import UserProvider, { useUser } from "@/libs/UserContext";
import { DigimonsDbProvider } from "../libs/DigimonsDbContext";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ScreenWidthProvider>
        <InnerApp Component={Component} pageProps={pageProps} />
      </ScreenWidthProvider>
    </UserProvider>
  );
}

function InnerApp({ Component, pageProps }) {
  const router = useRouter();

  const [user] = useUser();

  useEffect(() => {
    // Wait until user state is known
    if (user === null) return;

    if (router.pathname === "/login" && user) {
      router.push("/");
    } else if (router.pathname === "/" && !user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <Header />
      <DigimonsDbProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </DigimonsDbProvider>
    </>
  );
}
