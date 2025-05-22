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
      <div className={styles["pokemon-header-content"]}>
        <div className={styles["header-logo"]}>
          <img src={pokemonIcon.src} />
          <h1 className={styles["header-text"]}>pokemon</h1>
        </div>

        {screenWidth > 1200 && (
          <VerticalDivider className={styles["header-vertical-divider"]} />
        )}

        {username && (
          <div className={styles["auth-links"]}>
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
