import Header from "../components/header";
import UserMenu from "./userMenu";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <UserMenu />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
