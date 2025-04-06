import React from "react";

function Login() {
  return (
    <>
      <main>
        <form id="form">
          <h1>Login</h1>

          <section class="inputs">
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

          <section class="login-buttons-container">
            <button class="login-button" onclick="formValidation(event)">
              login
            </button>
            <button class="guest-button" onclick="welcomeGuest()">
              join as guest
            </button>
          </section>
        </form>
      </main>
    </>
  );
}
