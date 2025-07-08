import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useScreenWidth } from "../libs/screenContext";
import VerticalDivider from "./verticalDivider";
import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [username, setUsername] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

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

        {username && (
          <>
            {screenWidth > 1200 && (
              <div className={styles["vertical-divider-wrapper"]}>
                <VerticalDivider />
              </div>
            )}

            <div className={styles["user-info"]}>
              <p>{username}</p>

              <button
                onClick={() => {
                  localStorage.removeItem("username");
                  setUsername(null);
                  router.push("/login");
                }}
              >
                log out
              </button>
            </div>

            {screenWidth > 1200 && (
              <div className={styles["vertical-divider-wrapper"]}>
                <VerticalDivider />
              </div>
            )}

            <div className={styles["pages-links"]}>
              <Link href="">pokedex</Link>
              <Link href="">guess that pokemon</Link>
            </div>
          </>
        )}
      </div>

      {screenWidth > 1200 && (
        <p className={styles.date}>{new Date().toLocaleDateString("en-GB")}</p>
      )}
    </header>
  );
}
