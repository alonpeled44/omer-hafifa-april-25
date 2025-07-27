import { useScreenWidth } from "../libs/screenContext";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import styles from "../styles/components/header.module.css";
import Settings from "./settings";
import { useState } from "react";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [isOpen, setIsOpen] = useState({
    isSettingsOpen: false,
    isColorsOpen: false,
    isFontsOpen: false,
  });

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      <div className={styles["right-section"]}>
        {screenWidth > 1200 && (
          <p className={styles.date}>
            {new Date().toLocaleDateString("en-GB")}
          </p>
        )}

        <img
          src={settingsIcon.src}
          onClick={() => {
            setIsOpen((prev) => {
              const prevIsOpen = { ...prev };
              prevIsOpen.isSettingsOpen = !prevIsOpen.isSettingsOpen;
              return prevIsOpen;
            });
          }}
        />

        {isOpen.isSettingsOpen &&
          (screenWidth > 1200 ? (
            <Settings></Settings>
          ) : (
            <div className={styles["settings-list"]}>
              <button className={styles["color-settings"]}></button>
              <button className={styles["font-settings"]}></button>
            </div>
          ))}
      </div>
    </header>
  );
}
