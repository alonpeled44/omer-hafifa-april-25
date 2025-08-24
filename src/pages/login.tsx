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
    const currentUserProps: string = localStorage.getItem("id");
    if (currentUserProps) {
      router.push("/");
    }
  }, [loggedUser]);

  return (
    <form
      className={styles["login-form"]}
      onSubmit={(event) => {
        event.preventDefault();

        if (username === "" || password === "") {
          setErrorMessage("Username or password are empty");
          return;
        }

        currentUsers
          .then((resolve: Users[] | undefined) => {
            if (resolve) {
              const foundUser = resolve.find(
                (currentUser) =>
                  currentUser.username === username &&
                  currentUser.password === password
              );
              if (foundUser) {
                setLoggedUser(foundUser);
                localStorage &&
                  localStorage.setItem("id", foundUser.id.toString());
                setErrorMessage("");
              } else {
                setErrorMessage("Username or password incorrect");
              }
            } else {
              console.log("No users fetched");
            }
          })
          .catch((err) => {
            console.error("Error fetching users:", err);
          });
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
            router.push("/");
          }}
        >
          join as guest
        </button>
      </section>
    </form>
  );
}
