import { useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import Settings from "./settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import darkIcon from "../images/dark-mode-icon.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [isOpen, setIsOpen] = useState({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState({
    bright: true,
    selectedFont: "small",
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
            <button className={styles["settings-list"]}>
              <button
                onClick={() => {
                  setSelected((prev) => {
                    const prevSelected = { ...prev };
                    prevSelected.bright = !prevSelected.bright;
                    return prevSelected;
                  });
                }}
                className={styles["color-settings"]}
              >
                {selected.bright ? (
                  <img src={brightIcon.src} />
                ) : (
                  <img src={darkIcon.src} />
                )}
              </button>
              <button
                onClick={() => {
                  setIsOpen((prev) => {
                    const prevIsOpen = { ...prev };
                    prevIsOpen.isFontsOpen = !prevIsOpen.isFontsOpen;
                    return prevIsOpen;
                  });
                }}
                className={styles["font-settings"]}
              >
                <img src={darkIcon.src} />
              </button>
            </button>
          ))}
      </div>
    </header>
  );
}
