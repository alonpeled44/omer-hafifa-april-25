import React, {use, useState} from "react";
import styles from "../styles/pages/login.module.css";

function Login() {
  const usersData=[
    { _username: "wer123", _password: "gg666" },
    { _username: "ola098", _password: "fff3323r" },
    { _username: "1111", _password: "2234rrr" },
    ];

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();

      if(!user._username || !user._password)
      {
        setErrorMessage('Username or password are empty');
        return;
      }

      const foundUser = usersData.find(currentUser => {
        currentUser._username===user._username && currentUser._password===user._password;
      });

      if(foundUser){
        alert(`Welcome ${user._username}`);
        setErrorMessage('');
      }
      else{
        setErrorMessage('Username or password incorrect');
      }
    };

    const handleGuestClick = () => {
       alert('Welcome guest');
    };

    const handleInputChange = (event) => {
      let {name, value} = event.target;
      setTimeout(() => {
        const regex = /[^A-Za-z0-9]/g;
        value = value.replace(regex, "");
        console.log("after replace: "+value);
        setUser((prev) => ({
          ...prev,
          [name]: value
        }));
        console.log(user);
      }, 0);
    };


  return (
    <main>
      <form id="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <section className={styles.inputs}>
          <div>
            <input
              id="username"
              name="_username"
              type="text"
              value={user._username || ''}
              onChange={handleInputChange}
              placeholder="username"
              autocomplete="username"
            />
            <input
              id="password"
              name="_password"
              type="password"
              value={user._password || ''}
              onChange={handleInputChange}
              placeholder="password"
              autocomplete="current-password"
            />
          </div>
          <div id="error-message" style={{ color: "red", fontSize: 25 }}>
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
  );
}

export default Login;