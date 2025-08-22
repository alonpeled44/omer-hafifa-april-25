import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScreenWidth } from "../libs/ScreenContext";
import getUsers from "@/libs/useUser";
import styles from "../styles/pages/login.module.css";

enum Theme {
  Light = "light",
  Dark = "dark",
}

enum FontSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface LoggedUserProps {
  username: string;
  password: string;
}

interface Users {
  id: number;
  username: string;
  password: string;
  theme: string;
  fontSize: string;
}

export default function Login() {
  const [loggedUser, setLoggedUser] = useState<LoggedUserProps | null>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const screenWidth = useScreenWidth();

  const router = useRouter();

  const currentUsers = getUsers();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      console.log("User ID in localStorage on mount:", userId); // Debug log
      // Load settings for already logged-in user
      const loadSettings = async () => {
        try {
          const id = parseInt(userId, 10);
          if (id === 0) {
            // Guest user
            document.documentElement.setAttribute("data-theme", Theme.Light);
            document.documentElement.setAttribute("data-font-size", FontSize.Medium);
            console.log("Applied guest settings: light, medium");
          } else {
            const users = await getUsers();
            const foundUser = users.find((u) => u.id === id);
            if (foundUser) {
              document.documentElement.setAttribute("data-theme", foundUser.theme);
              document.documentElement.setAttribute("data-font-size", foundUser.fontSize);
              console.log("Applied user settings:", foundUser.theme, foundUser.fontSize);
            }
          }
        } catch (err) {
          console.error("Error loading settings:", err);
          // Fallback to defaults
          document.documentElement.setAttribute("data-theme", Theme.Light);
          document.documentElement.setAttribute("data-font-size", FontSize.Medium);
        }
      };
      loadSettings();
    }
  }, []);

  return (
    <form
      className={styles["login-form"]}
      onSubmit={async(event) => {
        event.preventDefault();

        if (username === "" || password === "") {
          setErrorMessage("Username or password are empty");
          return;
        }

        try {
      const users = await getUsers();
      console.log("Users during login:", users); // Debug log
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        setLoggedUser({ username: foundUser.username, password: foundUser.password });
        localStorage.setItem("id", foundUser.id.toString());
        console.log("Logged in user ID:", foundUser.id); // Debug log
        // Apply settings immediately
        document.documentElement.setAttribute("data-theme", foundUser.theme);
        document.documentElement.setAttribute("data-font-size", foundUser.fontSize);
        console.log("Applied settings after login:", foundUser.theme, foundUser.fontSize);
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage("Username or password incorrect");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrorMessage("Failed to fetch users");
    }
      }}
    >
      {screenWidth > 1200 && <h1 className={styles["login-header"]}>Login</h1>}

      <section className={styles.inputs}>
        <input
          id="username"
          type="text"
          placeholder="username"
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
            setUsername(newValue);
          }}
          value={username}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
            setPassword(newValue);
          }}
          value={password}
        />
        <p className={styles["error-message"]}>{errorMessage}</p>
      </section>

      <section className={styles.buttons}>
        <button className={styles["login-button"]} type="submit">
          login
        </button>
        <button
          className={styles["guest-button"]}
          type="button"
          onClick={() => {
            setUsername("Guest");
            localStorage && localStorage.setItem("id", "0");
            console.log("Guest login, ID set to 0"); // Debug log
            // Apply guest settings
            document.documentElement.setAttribute("data-theme", Theme.Light);
            document.documentElement.setAttribute("data-font-size", FontSize.Medium);
            console.log("Applied guest settings: light, medium");
            router.push("/");
          }}
        >
          join as guest
        </button>
      </section>
    </form>
  );
}
