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
  const currentUser = getUsers();
  const [user, setUser] = useState<Users | undefined>();
  const [isOpen, setIsOpen] = useState<IsOpenProps>({
    isSettingsOpen: false,
    isFontsOpen: false,
  });
  const [selected, setSelected] = useState<SelectedProps>({
    selectedTheme: Theme.Light,
    selectedFont: FontSize.Medium,
  });
  const [fontSizes, setFontSizes] = useState<FontSize[]>([
    ...Object.values(FontSize),
  ]);

  useEffect(() => {
    currentUser
      .then((resolved) => {
        if (resolved) {
          const userId = parseInt(localStorage.getItem("id") || "0", 10);
          const foundUser = resolved.find((user) => user.id === userId);
          if (foundUser) {
            setUser(foundUser);
            setSelected({
              selectedTheme: foundUser.theme,
              selectedFont: foundUser.fontSize,
            });
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("No users fetched");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        throw new Error("Failed to load user data");
      });
  }, []);

  const findFontSize = (
    chosenFontSize: FontSize,
    fontSizeType: string
  ): void => {
    Object.values(FontSize).find(
      (fontSizeVal) => fontSizeVal === fontSizeType
    ) && handleFontSizeSelect(chosenFontSize);
  };

  const handleFontSizeSelect = (chosenFontSize: FontSize) => {
    const newFontSizes: FontSize[] = fontSizes.map((fontSize) =>
      fontSize === chosenFontSize ? selected.selectedFont : fontSize
    ) as FontSize[];

    setSelected((prev) => ({ ...prev, selectedFont: chosenFontSize }));
    setFontSizes(
      newFontSizes.filter(
        (
          duplicatedFontSize: FontSize,
          index: number,
          initialArray: FontSize[]
        ) => initialArray.indexOf(duplicatedFontSize) === index
      )
    );
    setIsOpen((prev) => ({ ...prev, isFontsOpen: !prev.isFontsOpen }));
  };

  // Update database when theme or font size changes
  const handleUpdateUser = async (updates: {
    theme?: string;
    fontSize?: string;
  }) => {
    if (!user) {
      throw new Error("No user selected");
    }
    const result = await updateUserApi(user.id, updates);
    if (result.success) {
      console.log(result.message, result.updatedUser);
      // Update local user state
      setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    } else {
      throw new Error(result.message);
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelected((prev) => ({ ...prev, selectedTheme: theme }));
    handleUpdateUser({ theme });
  };

  const handleFontSizeSelecttemp = (fontSize: FontSize) => {
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
                      selected.selectedFont === "medium" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      findFontSize(FontSize.Medium, "medium");
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
                  {fontSizes
                    .filter((fontSize) => fontSize !== selected.selectedFont)
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
