import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useScreenWidth } from "../libs/ScreenContext";
import { updateUserSettings } from "@/libs/useUser";
import { FontSize, Theme, User } from "@/libs/types";
import Settings from "./Settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import darkIcon from "../images/dark-mode-icon.png";
import styles from "../styles/components/header.module.css";
import HorizontalDivider from "./HorizontalDivider";

interface HeaderProps {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

interface IsOpenProps {
  isSettingsOpen: boolean;
  isFontsOpen: boolean;
}

type UserSettings = Pick<User, "theme" | "fontSize">;

const fontSizes = [...Object.values(FontSize)];

export default function Header({ currentUser, setCurrentUser }: HeaderProps) {
  const router = useRouter();

  const screenWidth = useScreenWidth();

  const [isOpen, setIsOpen] = useState<IsOpenProps>({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState<UserSettings>({
    theme: currentUser?.theme || Theme.Light,
    fontSize: currentUser?.fontSize || FontSize.Medium,
  });

  async function updateThemeOrFontSize(theme?: Theme, fontSize?: FontSize) {
    if (!currentUser || currentUser.id === 0) return;

    const updates: { theme?: Theme; fontSize?: FontSize } = {};

    if (theme) {
      updates.theme = theme;
    }
    if (fontSize) {
      updates.fontSize = fontSize;
    }

    const result = await updateUserSettings(currentUser.id, updates);

    if (result.success) {
      setCurrentUser({ ...currentUser, ...updates });
    } else {
      return;
    }
  }

  function updateLoggedUserFontSize(selectedFontSize: FontSize) {
    updateThemeOrFontSize(undefined, selectedFontSize);
    setSelected((prev) => ({
      ...prev,
      fontSize: selectedFontSize,
    }));
    setIsOpen((prev) => ({ ...prev, isFontsOpen: false }));
  }

  useEffect(() => {
    if (currentUser) {
      setSelected({
        theme: currentUser.theme,
        fontSize: currentUser.fontSize,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selected.theme);
    document.documentElement.setAttribute("data-font-size", selected.fontSize);
  }, [selected]);

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <div className={styles["logo-container"]}>
          <img src={pokemonIcon.src} />
          <p className={styles["header-text"]}>pokemon</p>
        </div>

        {currentUser && (
          <>
            <HorizontalDivider height="100%" width="8px" />
            <div className={styles["user-info"]}>
              <p>{currentUser.username}</p>
              <button
                className={styles["log-out-button"]}
                onClick={() => {
                  setCurrentUser(null);
                  localStorage.removeItem("id");
                  document.documentElement.setAttribute(
                    "data-theme",
                    Theme.Light
                  );
                  document.documentElement.setAttribute(
                    "data-font-size",
                    FontSize.Medium
                  );
                  router.push("/login");
                }}
              >
                Log out
              </button>
            </div>
            <HorizontalDivider height="100%" width="8px" />
          </>
        )}
      </div>

      <div
        className={styles["right-section"]}
        user-not-logged-in-small-screen={
          (currentUser === null && screenWidth < 1200) || undefined
        }
        settings-open={isOpen.isSettingsOpen || undefined}
      >
        {screenWidth > 1200 && (
          <p className={styles.date}>
            {new Date().toLocaleDateString("en-GB")}
          </p>
        )}

        {currentUser && (
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
        )}

        {isOpen.isSettingsOpen &&
          currentUser &&
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
                    onClick={() => {
                      updateThemeOrFontSize(Theme.Dark);
                      setSelected((prev) => ({ ...prev, theme: Theme.Dark }));
                    }}
                  >
                    <img src={darkIcon.src} />
                    <span>dark</span>
                  </button>
                  <button
                    className={`${styles["theme-button"]} ${
                      selected.theme === "light" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      updateThemeOrFontSize(Theme.Light);
                      setSelected((prev) => ({ ...prev, theme: Theme.Light }));
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
                      selected.fontSize === "large" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      const foundFontSize = fontSizes.find(
                        (fontSize) => fontSize === FontSize.Large
                      );
                      foundFontSize && updateLoggedUserFontSize(FontSize.Large);
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
                      const foundFontSize = fontSizes.find(
                        (fontSize) => fontSize === FontSize.Medium
                      );
                      foundFontSize &&
                        updateLoggedUserFontSize(FontSize.Medium);
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
                      const foundFontSize = fontSizes.find(
                        (fontSize) => fontSize === FontSize.Small
                      );
                      foundFontSize && updateLoggedUserFontSize(FontSize.Small);
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
                    if (selected.theme === Theme.Light) {
                      updateThemeOrFontSize(Theme.Dark);
                      setSelected((prev) => ({ ...prev, theme: Theme.Dark }));
                    } else {
                      updateThemeOrFontSize(Theme.Light);
                      setSelected((prev) => ({ ...prev, theme: Theme.Light }));
                    }
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
                          updateLoggedUserFontSize(fontSize);
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
