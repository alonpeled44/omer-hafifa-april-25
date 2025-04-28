import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
      const userExist = localStorage.getItem("username");
      if(!userExist){
        router.push("/login");
      }
    }, []);

  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
