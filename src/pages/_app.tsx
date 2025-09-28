import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ScreenWidthProvider } from "../libs/ScreenContext";
import { DigimonsDbProvider } from "../libs/DigimonsDbContext";
import { getUserById } from "@/libs/useUser";
import { FontSize, Theme, User } from "@/libs/types";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ScreenWidthProvider>
      <InnerApp Component={Component} pageProps={pageProps} />
    </ScreenWidthProvider>
  );
}

function InnerApp({ Component, pageProps }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const guest: User = {
    id: 0,
    username: "Guest",
    password: " ",
    theme: Theme.Light,
    fontSize: FontSize.Medium,
  };

  async function getUser(id: string) {
    const user = await getUserById(Number(id));
    setCurrentUser(user);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedId = localStorage.getItem("id");

      if (!storedId) {
        if (router.pathname !== "/login") {
          router.push("/login");
        }
      } else if (storedId === "0") {
        setCurrentUser(guest);
      } else {
        getUser(storedId);
      }
    }
  }, [router]);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <DigimonsDbProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </DigimonsDbProvider>
    </>
  );
}
