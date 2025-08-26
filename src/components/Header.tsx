import { useState, useEffect } from "react";
import { useScreenWidth } from "../libs/ScreenContext";
import Settings from "./Settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import darkIcon from "../images/dark-mode-icon.png";
import styles from "../styles/components/header.module.css";
import { updateUserApi } from "@/libs/useUser";
import { FontSize, Theme, User } from "@/libs/types";
import { useUser } from "@/libs/UserContext";

type UserSettings = Pick<User, "theme" | "fontSize">;

interface ModalsDisplay {
  settings: boolean;
  fontSizeSelection: boolean
}

const fontSizes = [...Object.values(FontSize)] as const;

export default function Header() {
  const screenWidth = useScreenWidth();

  const [currentUser, setCurrentUser] = useUser();

  const [ModalsDisplay, setModalsDisplay] = useState<ModalsDisplay>({
    settings: false,
    fontSizeSelection: false,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: Theme.Light,
    fontSize: FontSize.Medium,
  });

  useEffect(() => {
    handleUpdateUser(userSettings);
    changeUiFontAndTheme();
  }, [userSettings]);

  // Update database when theme or font size changes
  const handleUpdateUser = async (updates: Partial<UserSettings>) => {
    if (!currentUser || currentUser.id === 0) return;

    const result = await updateUserApi(currentUser.id, updates);
    if (result.success) {
      // Update local user state
      setCurrentUser((prev) => ({ ...prev, ...updates }));
    } else {
      console.error(`${result} failed with updates: ${updates}`);
      return;
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    setUserSettings((prev) => ({ ...prev, theme: theme }));
  };

  const handleFontSizeSelect = (fontSize: FontSize) => {
    setUserSettings((prev) => ({ ...prev, fontSize }));
    setModalsDisplay((prev) => ({ ...prev, isFontsOpen: false }));
  };

  const changeUiFontAndTheme = () => {
    document.documentElement.setAttribute("data-theme", userSettings.theme);
    document.documentElement.setAttribute(
      "data-font-size",
      userSettings.fontSize
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      <div
        className={styles["right-section"]}
        settings-open={ModalsDisplay.settings}
      >
        {screenWidth > 1200 && (
          <p className={styles.date}>
            {new Date().toLocaleDateString("en-GB")}
          </p>
        )}

        <img
          src={settingsIcon.src}
          onClick={() => {
            setModalsDisplay((prev) => ({
              settings: !prev.settings,
              fontSizeSelection: false,
            }));
          }}
          className={styles["settings-icon"]}
        />

        {ModalsDisplay.settings &&
          (screenWidth > 1200 ? (
            <Settings
              isOpen={ModalsDisplay.settings}
              onClose={() => {
                setModalsDisplay((prev) => ({
                  ...prev,
                  isSettingsOpen: !prev.settings,
                }));
              }}
            >
              <div className={styles["row-container"]}>
                <p>Theme</p>

                <div className={styles["icons-container"]}>
                  <button
                    className={`${styles["theme-button"]} ${
                      userSettings.theme === "dark" ? styles.selected : ""
                    }`}
                    onClick={() => handleThemeSelect(Theme.Dark)}
                  >

                    <img src={darkIcon.src} />

                    <span>dark</span>
                  </button>

                  <button
                    className={`${styles["theme-button"]} ${
                      userSettings.theme === "light" ? styles.selected : ""
                    }`}
                    onClick={() => handleThemeSelect(Theme.Light)}
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
                      userSettings.fontSize === "large" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find(
                        (fontSize) => fontSize === FontSize.Large
                      ) && handleFontSizeSelect(FontSize.Large);
                    }}
                  >
                    Aa
                    <span>large</span>
                  </button>

                  <button
                    className={`${styles["medium-font-size"]} ${
                      userSettings.fontSize === "medium" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find(
                        (fontSize) => fontSize === FontSize.Medium
                      ) && handleFontSizeSelect(FontSize.Medium);
                    }}
                  >
                    Aa
                    <span>medium</span>
                  </button>

                  <button
                    className={`${styles["small-font-size"]} ${
                      userSettings.fontSize === "small" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      fontSizes.find(
                        (fontSize) => fontSize === FontSize.Small
                      ) && handleFontSizeSelect(FontSize.Small);
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
                    setUserSettings((prev) => ({
                      ...prev,
                      theme:
                        prev.theme === Theme.Light ? Theme.Dark : Theme.Light,
                    }));
                    changeUiFontAndTheme();
                  }}
                  className={styles["color-settings"]}
                >
                  {userSettings.theme === "light" ? (
                    <img src={brightIcon.src} />
                  ) : (
                    <img src={darkIcon.src} />
                  )}
                </button>

                <button
                  key={userSettings.fontSize}
                  onClick={() => {
                    setModalsDisplay((prev) => ({
                      ...prev,
                      isFontsOpen: !prev.fontSizeSelection,
                    }));
                  }}
                  className={`${styles["font-settings"]} ${
                    styles[userSettings.fontSize]
                  }`}
                >
                  Aa
                </button>
              </div>

              {ModalsDisplay.fontSizeSelection && (
                <div className={styles["font-sizes-list"]}>
                  {fontSizes
                    .filter((fontSize) => fontSize !== userSettings.fontSize)
                    .map((fontSize) => (
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
