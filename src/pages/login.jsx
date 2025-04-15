import React, { useState } from "react";
import styles from "../styles/pages/login.module.css";
import Header from "../components/header";

function Login() {
  const usersData = [
    { _username: "wer123", _password: "gg666" },
    { _username: "ola098", _password: "fff3323r" },
    { _username: "1111", _password: "2234rrr" },
  ];

  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  // }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage("Username or password are empty");
      setUser({ _username: username, _password: password });
      return;
    }
    setUser({ _username: username, _password: password });

    const foundUser = usersData.find(
      (currentUser) =>
        currentUser._username === username &&
        currentUser._password === password
    );

    if (foundUser) {
      alert(`Welcome ${username}`);
      setErrorMessage("");
    } else {
      setErrorMessage("Username or password incorrect");
    }
  };

  const handleGuestClick = () => {
    alert("Welcome guest");
  };

  const handleUsernameChange = (event) => {
    const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
    setUsername(newValue);
  };

  const handlePasswordChange = (event) => {
    const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
    setPassword(newValue);
  };

  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Enter",
  ];
  const restrictToAlphanumeric = (event) => {
    const regex = /^[A-Za-z0-9]$/;
    if (allowedKeys.includes(event.key) || regex.test(event.key)) {
      return;
    }
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <main>
        <form id="form" onSubmit={handleSubmit}>
          <h1 className={styles["login-header"]}>Login</h1>

          <section className={styles.inputs}>
            <div>
              <input
                id="username"
                name="_username"
                type="text"
                onKeyDown={restrictToAlphanumeric}
                onChange={handleUsernameChange}
                placeholder="username"
                value={username}
              />
              <input
                id="password"
                name="_password"
                type="password"
                onKeyDown={restrictToAlphanumeric}
                onChange={handlePasswordChange}
                placeholder="password"
                value={password}
              />
            </div>
            <div className={styles["error-message"]}>{errorMessage}</div>
          </section>

          <section className={styles["login-buttons-container"]}>
            <button className={styles["login-button"]} type="submit">
              login
            </button>
            <button
              className={styles["guest-button"]}
              type="button"
              onClick={handleGuestClick}
            >
              join as guest
            </button>
          </section>
        </form>
      </main>
    </>
  );
}

export default Login;
