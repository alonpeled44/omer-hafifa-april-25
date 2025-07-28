import { useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import Settings from "./settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import darkIcon from "../images/dark-mode-icon.png";
import fontSizeIcon from "../images/font-size-icon.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const { screenWidth } = useScreenWidth();
  const [isOpen, setIsOpen] = useState({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState({
    bright: true,
    selectedFont: "medium",
  });
  const [fontSizes, setFontSizes] = useState(["small", "large"]);

  const handleFontSizeSelect = (chosenFontSize) => {
    const newFontSizes = fontSizes.map((fontSize) =>
      fontSize === chosenFontSize ? selected.selectedFont : fontSize
    );

    setSelected((prev) => {
      const prevSelected = { ...prev };
      prevSelected.selectedFont = chosenFontSize;
      return prevSelected;
    });
    setFontSizes(newFontSizes);
    setIsOpen((prev) => {
      const prevIsOpen = { ...prev };
      prevIsOpen.isFontsOpen = !prevIsOpen.isFontsOpen;
      return prevIsOpen;
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      <div
        className={styles["right-section"]}
        settings-open={isOpen.isSettingsOpen || undefined}
      >
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
          className={styles["settings-icon"]}
        />

        {isOpen.isSettingsOpen &&
          (screenWidth > 1200 ? (
            <Settings></Settings>
          ) : (
            <>
              <div className={styles["settings-list"]}>
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
                  <img src={fontSizeIcon.src} />
                </button>
              </div>

              {isOpen.isFontsOpen && (
                <div className={styles["font-sizes-list"]}>
                  {fontSizes.map((fontSize) => (
                    <button
                      key={fontSize}
                      onClick={() => {
                        console.log(fontSize);
                        handleFontSizeSelect(fontSize);
                      }}
                      className={styles["font-size"]}
                    >
                      <img src={fontSizeIcon.src} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ))}
      </div>
    </header>
  );
}
