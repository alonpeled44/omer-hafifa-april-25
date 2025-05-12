import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScreenWidth } from "../libs/screenContext";
import HeaderBorder from "./headerBorder";
import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [username, setUsername] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername);
    setUsername(storedUsername || null);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
        {username && (
          <div className={styles["header-menu"]}>
            <HeaderBorder></HeaderBorder>
            <p>{username}</p>
            <button>log out</button>
          </div>
        )}
      </div>

      {screenWidth > 1200 && (
        <p className={styles.date}>{new Date().toLocaleDateString("en-GB")}</p>
      )}
    </header>
  );
}
