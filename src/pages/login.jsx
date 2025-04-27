import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/login.module.css";

const usersData = [
  { _username: "wer123", _password: "gg666" },
  { _username: "ola098", _password: "fff3323r" },
  { _username: "1111", _password: "2234rrr" },
];
function Login() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [width, setWidth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const currentUsername = localStorage.getItem("username");
    if (currentUsername) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

        const foundUser = usersData.find(
          (currentUser) =>
            currentUser._username === username &&
            currentUser._password === password
        );

        if (foundUser) {
          setUser(foundUser);
          localStorage && localStorage.setItem("username", username);
          // &&
          // ??
          // ||
          alert(`Welcome ${username}`);
          setErrorMessage("");
        } else {
          setErrorMessage("Username or password incorrect");
        }
      }}
    >
      {width > 1200 && <h1 className={styles["login-header"]}>Login</h1>}

      <section className={styles.inputs}>
        <input
          id={"username"}
          name={"_username"}
          type="text"
          placeholder={"username"}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
            setUsername(newValue);
          }}
          value={username}
        />
        <input
          id={"password"}
          name={"_password"}
          type="password"
          placeholder={"password"}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
            setPassword(newValue);
          }}
          value={password}
        />
        <p className={styles["error-message"]}>{errorMessage}</p>
      </section>

      <section className={styles["login-buttons-container"]}>
        <button className={styles["login-button"]} type="submit">
          login
        </button>
        <button
          className={styles["guest-button"]}
          type="button"
          onClick={(event) => {
            setUsername("Guest");
            localStorage.setItem("username", "Guest");
            alert("Welcome guest");
            router.push('/');
          }}
        >
          join as guest
        </button>
      </section>
    </form>
  );
}

export default Login;
