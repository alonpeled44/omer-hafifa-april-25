import React, {useState} from "react";
import styles from "../styles/pages/login.module.css";

function Login() {
  const usersData=[
    { _username: "wer123", _password: "gg666" },
    { _username: "ola098", _password: "fff3323r" },
    { _username: "1111", _password: "2234rrr" },
    ];

    const [user, setUser] = useState({});

    const handleSubmit = (event) => {
      event.preventDefault();

    }

    const handleChange = ({target}) => {
      const {name, value} = target;
       setUser((prevUser) => ({
        ...prevUser,
        [name]: value
       }));
    }


  return (
    <main>
      <form id="form">
        <h1>Login</h1>

        <section className={styles.inputs}>
          <div>
            <input
              id="username"
              type="text"
              placeholder="username"
              autocomplete="username"
            />
            <input
              id="password"
              type="password"
              placeholder="password"
              autocomplete="current-password"
            />
          </div>
          <div id="error-message"></div>
        </section>

        <section className={styles["login-buttons-container"]}>
          <button className={styles["login-button"]} onclick="formValidation(event)">
            login
          </button>
          <button className={styles["guest-button"]} onclick="welcomeGuest()">
            join as guest
          </button>
        </section>
      </form>
    </main>
  );
}

export default Login;