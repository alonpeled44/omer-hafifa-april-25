import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScreenWidth } from "../libs/ScreenContext";
import styles from "../styles/pages/login.module.css";

interface LoggedUserProps {
  username: string;
  password: string;
}

const usersData = [
  { username: "wer123", password: "gg666" },
  { username: "ola098", password: "fff3323r" },
  { username: "1111", password: "2234rrr" },
];

export default function Login() {
  const [loggedUser, setLoggedUser] = useState<LoggedUserProps | null>(null); //{} is for initialized value.

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const screenWidth = useScreenWidth();

  const router = useRouter();

  useEffect(() => {
    const currentUsername: string = localStorage.getItem("username");
    if (currentUsername) {
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

        const foundUser = usersData.find(
          (currentUser) =>
            currentUser.username === username &&
            currentUser.password === password
        );

        if (foundUser) {
          setLoggedUser(foundUser);
          localStorage && localStorage.setItem("username", username);
          setErrorMessage("");
        } else {
          setErrorMessage("Username or password incorrect");
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
            localStorage && localStorage.setItem("username", "Guest");
            router.push("/");
          }}
        >
          join as guest
        </button>
      </section>
    </form>
  );
}
