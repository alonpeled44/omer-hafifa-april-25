import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScreenWidth } from "../libs/screenContext";
import VerticalDivider from "./verticalDivider";
import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [username, setUsername] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || null);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <h1 className={styles["header-text"]}>pokemon</h1>
        {username && (
          <div className={styles["header-menu"]}>
            <VerticalDivider />
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
