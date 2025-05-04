import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/pages/login.module.css";

const usersData = [
  { _username: "wer123", _password: "gg666" },
  { _username: "ola098", _password: "fff3323r" },
  { _username: "1111", _password: "2234rrr" },
];

export default function Login() {
  const [loggedUser, setLoggedUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { screenWidth } = useScreenWidth();

  const router = useRouter();

  useEffect(() => {
    const currentUsername = localStorage.getItem("username");
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
            currentUser._username === username &&
            currentUser._password === password
        );

        if (foundUser) {
          setLoggedUser(foundUser);
          localStorage && localStorage.setItem("username", username);
          alert(`Welcome ${username}`);
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
            alert("Welcome guest");
            router.push("/");
          }}
        >
          join as guest
        </button>
      </section>
    </form>
  );
}
