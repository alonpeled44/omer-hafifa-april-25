import { useState, useEffect } from "react";
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
    document.documentElement.setAttribute(
      "data-font-size",
      selected.selectedFont
    );
  }, [selected.selectedTheme, selected.selectedFont]);

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
                    <span>dark</span>
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
                    <span>light</span>
                  </button>
                </div>
              </div>
              <div className={styles["row-container"]}>
                <p>Font Size</p>
                <div className={styles["icons-container"]}>
                  <button
                    className={`${styles["large-font-size"]} ${
                      selected.selectedFont === "large" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "large") &&
                        handleFontSizeSelect("large");
                    }}
                  >
                    Aa
                    <span>large</span>
                  </button>
                  <button
                    className={`${styles["medium-font-size"]} ${
                      selected.selectedFont === "medium" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "medium") &&
                        handleFontSizeSelect("medium");
                    }}
                  >
                    Aa
                    <span>medium</span>
                  </button>
                  <button
                    className={`${styles["small-font-size"]} ${
                      selected.selectedFont === "small" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find((fontSize) => fontSize === "small") &&
                        handleFontSizeSelect("small");
                    }}
                  >
                    Aa
                    <span>small</span>
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
                  className={`${styles["font-settings"]} ${
                    styles[selected.selectedFont]
                  }`}
                >
                  Aa
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
                      className={`${styles["font-size"]} ${styles[fontSize]}`}
                    >
                      Aa
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
