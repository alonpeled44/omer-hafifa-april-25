import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScreenWidth } from "../libs/ScreenContext";
import getUsers from "@/libs/useUser";
import { FontSize, Theme, User } from "@/libs/types";
import { useUser } from "@/libs/UserContext";
import styles from "../styles/pages/login.module.css";

const validateInput = (value: string) => {
  return value.replace(/[^A-Za-z0-9]/g, "");
};

const guestUser: User = {
  id: 0,
  username: "Guest",
  password: "",
  theme: Theme.Light,
  fontSize: FontSize.Medium,
};

export default function Login() {
  const [_currentUser, setCurrentUser] = useUser();
  const [users, setUsers] = useState<User[]>([]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const screenWidth = useScreenWidth();

  const router = useRouter();

  const setToHomePage = () => router.push("/");

useEffect(() => {
  async function fetchUsers() {
    const result = await getUsers();
    setUsers(result);
  }
  fetchUsers();
}, []);


  return (
    <form
      className={styles["login-form"]}
      onSubmit={(event) => {
        event.preventDefault();

        if (username === "" || password === "") {
          setErrorMessage("Username or password are empty");
          return;
        }

        const foundUser = users.find(
          (user) => user.username === username && user.password === password
        );

        if (!foundUser) {
          setErrorMessage("Username or password are incorrect.");
          return;
        } else setCurrentUser(foundUser);

        setToHomePage();
      }}
    >
      {screenWidth > 1200 && <h1 className={styles["login-header"]}>Login</h1>}

      <section className={styles.inputs}>
        <input
          id="username"
          type="text"
          placeholder="username"
          onChange={(event) => {
            const newValue = validateInput(event.target.value);
            setUsername(newValue);
          }}
          value={username}
        />

        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={(event) => {
            const newValue = validateInput(event.target.value);
            setPassword(newValue);
          }}
          value={password}
        />

        <p className={styles["error-message"]}>{errorMessage}</p>
      </section>

      <section className={styles.buttons}>
        <button className={styles["login-button"]} type="submit">
          Login
        </button>

        <button
          className={styles["guest-button"]}
          type="button"
          onClick={() => {
            setCurrentUser(guestUser);
            setToHomePage();
          }}
        >
          Join As Guest
        </button>
      </section>
    </form>
  );
}
