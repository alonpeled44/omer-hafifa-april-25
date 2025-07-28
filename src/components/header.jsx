import { useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import Settings from "./settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [isOpen, setIsOpen] = useState({
    isSettingsOpen: false,
    isColorsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState({
    selectedColor: "shiny",
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
                  setIsOpen((prev) => {
                    const prevIsOpen = { ...prev };
                    prevIsOpen.isColorsOpen = !prevIsOpen.isColorsOpen;
                    return prevIsOpen;
                  });
                }}
                className={styles["color-settings"]}
              >
                {isOpen.isColorsOpen && (
                  <div>
                    <button>
                      <img src={brightIcon.src} />
                    </button>
                    <button>
                      <img src={brightIcon.src} />
                    </button>
                  </div>
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
                font
              </button>
            </button>
          ))}
      </div>
    </header>
  );
}
