import React from "react";
import styles from "../styles/pages/login.module.css";

function Login() {
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

        <section className="login-buttons-container">
          <button className="login-button" onclick="formValidation(event)">
            login
          </button>
          <button className="guest-button" onclick="welcomeGuest()">
            join as guest
          </button>
        </section>
      </form>
    </main>
  );
}

export default Login;