import { useState, useEffect } from "react";
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
    selectedTheme: "light",
    selectedFont: "medium",
  });
  const [fontSizes, setFontSizes] = useState(["small", "large"]);

  const handleFontSizeSelect = (chosenFontSize) => {
    const newFontSizes = fontSizes.map((fontSize) =>
      fontSize === chosenFontSize ? selected.selectedFont : fontSize
    );

    setSelected((prev) => ({ ...prev, selectedFont: chosenFontSize }));
    setFontSizes(newFontSizes);
    setIsOpen((prev) => ({ ...prev, isFontsOpen: !prev.isFontsOpen }));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selected.selectedTheme);
  }, [selected.selectedTheme]);

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
            setIsOpen((prev) => ({
              ...prev,
              isSettingsOpen: !prev.isSettingsOpen,
              isFontsOpen: false,
            }));
          }}
          className={styles["settings-icon"]}
        />

        {isOpen.isSettingsOpen &&
          (screenWidth > 1200 ? (
            <Settings
              isOpen={isOpen.isSettingsOpen}
              onClose={() => {
                setIsOpen((prev) => ({
                  ...prev,
                  isSettingsOpen: !prev.isSettingsOpen,
                }));
              }}
            >
              <div className={styles["row-container"]}>
                <p>Theme</p>
                <div className={styles["icons-container"]}>
                  <button
                    className={`${styles["theme-button"]} ${
                      selected.selectedTheme === "dark" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setSelected((prev) => ({
                        ...prev,
                        selectedTheme: "dark",
                      }));
                    }}
                  >
                    <img src={darkIcon.src} />
                  </button>
                  <button
                    className={`${styles["theme-button"]} ${
                      selected.selectedTheme === "light" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setSelected((prev) => ({
                        ...prev,
                        selectedTheme: "light",
                      }));
                    }}
                  >
                    <img src={brightIcon.src} />
                  </button>
                </div>
              </div>
              <div className={styles["row-container"]}>
                <p>Font Size</p>
                <div className={styles["icons-container"]}>
                  <button
                    className={`${styles["font-size-button"]} ${
                      selected.selectedFont === "large" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "large") &&
                        handleFontSizeSelect("large");
                    }}
                  >
                    <img src={fontSizeIcon.src} />
                  </button>
                  <button
                    className={`${styles["font-size-button"]} ${
                      selected.selectedFont === "medium" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "medium") &&
                        handleFontSizeSelect("medium");
                    }}
                  >
                    <img src={fontSizeIcon.src} />
                  </button>
                  <button
                    className={`${styles["font-size-button"]} ${
                      selected.selectedFont === "small" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "small") &&
                        handleFontSizeSelect("small");
                    }}
                  >
                    <img src={fontSizeIcon.src} />
                  </button>
                </div>
              </div>
            </Settings>
          ) : (
            <>
              <div className={styles["settings-list"]}>
                <button
                  onClick={() => {
                    setSelected((prev) => ({
                      ...prev,
                      selectedTheme:
                        prev.selectedTheme === "light" ? "dark" : "light",
                    }));
                    console.log(selected.selectedTheme);
                  }}
                  className={styles["color-settings"]}
                >
                  {selected.selectedTheme === "light" ? (
                    <img src={brightIcon.src} />
                  ) : (
                    <img src={darkIcon.src} />
                  )}
                </button>
                <button
                  key={selected.selectedFont}
                  onClick={() => {
                    setIsOpen((prev) => ({
                      ...prev,
                      isFontsOpen: !prev.isFontsOpen,
                    }));
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
