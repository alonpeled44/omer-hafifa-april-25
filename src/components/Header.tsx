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
import { useRouter } from "next/router";

interface IsOpenProps {
  isSettingsOpen: boolean;
  isFontsOpen: boolean;
}

type UserSettings = Pick<User, "theme" | "fontSize">;

const fontSizes = [...Object.values(FontSize)];

export default function Header() {
  const screenWidth = useScreenWidth();
  const router = useRouter();
  const user = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<IsOpenProps>({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState<UserSettings>({
    theme: Theme.Light,
    fontSize: FontSize.Medium,
  });

  useEffect(() => {
  if (user && user[0]) {
    setCurrentUser(user[0]);
    setSelected({
      theme: user[0].theme,
      fontSize: user[0].fontSize,
    });
    changeUiFontAndTheme(); // apply immediately on load
  }
}, [user]);


  useEffect(() => {
    const updates: Partial<UserSettings> = {};
    updates.theme = selected.theme;
    updates.fontSize = selected.fontSize;
    handleUpdateUser(updates);
    changeUiFontAndTheme();
  }, [selected]);

  // Update database when theme or font size changes
  const handleUpdateUser = async (updates: Partial<UserSettings>) => {
    if (!currentUser || currentUser.id === 0) return;

    const result = await updateUserApi(currentUser.id, updates);
    if (result.success) {
      // Update local user state
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      user[1](updatedUser);
    } else {
      console.error(`${result} not successeded with updates:  ${updates}`);
      return;
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelected((prev) => ({ ...prev, theme: theme }));
  };

  const handleFontSizeSelect = (fontSize: FontSize) => {
    setSelected((prev) => ({ ...prev, fontSize: fontSize }));
    setIsOpen((prev) => ({ ...prev, isFontsOpen: false }));
  };

  const changeUiFontAndTheme = () => {
    document.documentElement.setAttribute("data-theme", selected.theme);
    document.documentElement.setAttribute("data-font-size", selected.fontSize);
  };

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
        {user[0] && (
          <div>
            <p>{user[0].username}</p>
            <button
              onClick={() => {
                setCurrentUser(null);
                user[1](null);
                location.pathname = "/login";
                router.push(location.pathname);
              }}
            >
              Log out
            </button>
          </div>
        )}
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
                      selected.theme === "dark" ? styles.selected : ""
                    }`}
                    onClick={() => handleThemeSelect(Theme.Dark)}
                  >
                    <img src={darkIcon.src} />
                    <span>dark</span>
                  </button>
                  <button
                    className={`${styles["theme-button"]} ${
                      selected.theme === "light" ? styles.selected : ""
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
                      selected.fontSize === "large" ? styles.selected : ""
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
                      selected.fontSize === "medium" ? styles.selected : ""
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
                      selected.fontSize === "small" ? styles.selected : ""
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
                    setSelected((prev) => ({
                      ...prev,
                      theme:
                        prev.theme === Theme.Light ? Theme.Dark : Theme.Light,
                    }));
                    changeUiFontAndTheme();
                  }}
                  className={styles["color-settings"]}
                >
                  {selected.theme === "light" ? (
                    <img src={brightIcon.src} />
                  ) : (
                    <img src={darkIcon.src} />
                  )}
                </button>
                <button
                  key={selected.fontSize}
                  onClick={() => {
                    setIsOpen((prev) => ({
                      ...prev,
                      isFontsOpen: !prev.isFontsOpen,
                    }));
                  }}
                  className={`${styles["font-settings"]} ${
                    styles[selected.fontSize]
                  }`}
                >
                  Aa
                </button>
              </div>

              {isOpen.isFontsOpen && (
                <div className={styles["font-sizes-list"]}>
                  {fontSizes
                    .filter((fontSize) => fontSize !== selected.fontSize)
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
