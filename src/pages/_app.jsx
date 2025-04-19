import Header from "../components/header";
import "../styles/globals.css";
import UserMenu from "./userMenu";

export default function App({ Component, pageProps }) {
  return (<>
  <Header/>
  <UserMenu></UserMenu>
  <Component {...pageProps} />
  </>);
}
