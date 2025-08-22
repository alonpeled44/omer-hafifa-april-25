// Header.tsx
import { useState, useEffect } from "react";
import { useScreenWidth } from "../libs/ScreenContext";
import Settings from "./Settings";
import pokemonIcon from "../images/pokemon-photo.png";
import settingsIcon from "../images/settings-icon.png";
import brightIcon from "../images/bright-mode-icon.png";
import darkIcon from "../images/dark-mode-icon.png";
import styles from "../styles/components/header.module.css";
import getUsers from "@/libs/useUser";
import { updateUserApi } from "@/libs/useUser";

enum Theme {
  Light = "light",
  Dark = "dark",
}

enum FontSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface IsOpenProps {
  isSettingsOpen: boolean;
  isFontsOpen: boolean;
}

interface SelectedProps {
  selectedTheme: string;
  selectedFont: string;
}

interface Users {
  id: number;
  username: string;
  password: string;
  theme: string;
  fontSize: string;
}

export default function Header() {
  const screenWidth = useScreenWidth();
  const [user, setUser] = useState<Users | null>(null);
  const [isOpen, setIsOpen] = useState<IsOpenProps>({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState<SelectedProps>({
    selectedTheme: Theme.Light,
    selectedFont: FontSize.Medium,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = parseInt(localStorage.getItem("id") || "0", 10);
        if (userId === 0) {
          // Guest user
          setUser({
            id: 0,
            username: "guest",
            password: "none",
            theme: "light",
            fontSize: "medium",
          });
          setSelected({
            selectedTheme: "light",
            selectedFont: "medium",
          });
          return;
        }

        const users = await getUsers();
        const foundUser = users.find((u) => u.id === userId);
        if (foundUser) {
          setUser(foundUser);
          setSelected({
            selectedTheme: foundUser.theme,
            selectedFont: foundUser.fontSize,
          });
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        // Fallback to guest user
        setUser({
          id: 0,
          username: "guest",
          password: "none",
          theme: "light",
          fontSize: "medium",
        });
        setSelected({
          selectedTheme: "light",
          selectedFont: "medium",
        });
      }
    };

    loadUser();
  }, []);

  const handleUpdateUser = async (updates: {
    theme?: string;
    fontSize?: string;
  }) => {
    if (!user || user.id === 0) {
      // Don't update database for guest user
      setUser((prev) =>
        prev ? { ...prev, ...updates } : prev
      );
      setSelected((prev) => ({ ...prev, ...updates }));
      return;
    }
    try {
      const result = await updateUserApi(user.id, updates);
      if (result.success) {
        console.log(result.message, result.updatedUser);
        setUser((prev) => (prev ? { ...prev, ...updates } : prev));
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelected((prev) => ({ ...prev, selectedTheme: theme }));
    handleUpdateUser({ theme });
  };

  const handleFontSizeSelect = (fontSize: FontSize) => {
    setSelected((prev) => ({ ...prev, selectedFont: fontSize }));
    handleUpdateUser({ fontSize });
    setIsOpen((prev) => ({ ...prev, isFontsOpen: false }));
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
                    onClick={() => handleThemeSelect(Theme.Dark)}
                  >
                    <img src={darkIcon.src} />
                    <span>dark</span>
                  </button>
                  <button
                    className={`${styles["theme-button"]} ${
                      selected.selectedTheme === "light" ? styles.selected : ""
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
                      selected.selectedFont === "large" ? styles.selected : ""
                    }`}
                    onClick={() => handleFontSizeSelect(FontSize.Large)}
                  >
                    Aa
                    <span>large</span>
                  </button>
                  <button
                    className={`${styles["medium-font-size"]} ${
                      selected.selectedFont === "medium" ? styles.selected : ""
                    }`}
                    onClick={() => handleFontSizeSelect(FontSize.Medium)}
                  >
                    Aa
                    <span>medium</span>
                  </button>
                  <button
                    className={`${styles["small-font-size"]} ${
                      selected.selectedFont === "small" ? styles.selected : ""
                    }`}
                    onClick={() => handleFontSizeSelect(FontSize.Small)}
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
                  {Object.values(FontSize)
                    .filter((fontSize) => fontSize !== selected.selectedFont)
                    .map((fontSize) => (
                      <button
                        key={fontSize}
                        onClick={() => handleFontSizeSelect(fontSize)}
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