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
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUserame]=useState()
  const [password, setPassword]=useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const newUser = {};

    inputs.forEach((input) => {
      if (input.name) {
        newUser[`${input.name}`] = input.value;
      }
    });

    if (newUser._username === '' || newUser._password === '') {
      setErrorMessage('Username or password are empty');
      setUser(newUser);
      return;
    }
    setUser(newUser);

    const foundUser = usersData.find(
      (currentUser) =>
        currentUser._username === newUser._username &&
        currentUser._password === newUser._password
    );

    if (foundUser) {
      alert(`Welcome ${newUser._username}`);
      setErrorMessage('');
    }
    else {
      setErrorMessage('Username or password incorrect');
    }
  };

  const handleGuestClick = () => {
    alert('Welcome guest');
  };

  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Tab',
    'Enter'
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
                placeholder="username"
              />
              <input
                id="password"
                name="_password"
                type="password"
                onKeyDown={restrictToAlphanumeric}
                placeholder="password"
              />
            </div>
            <div className={styles["error-message"]}>
              {errorMessage}
            </div>
          </section>

          <section className={styles["login-buttons-container"]}>
            <button className={styles["login-button"]} type="submit">
              login
            </button>
            <button className={styles["guest-button"]} type="button" onClick={handleGuestClick}>
              join as guest
            </button>
          </section>
        </form>
      </main>
    </>
  );
}

export default Login;