import { useEffect, useState } from "react";
import styles from "../styles/pages/login.module.css";
import { useRouter } from "next/router";

function Login() {
  const usersData = [
    { _username: "wer123", _password: "gg666" },
    { _username: "ola098", _password: "fff3323r" },
    { _username: "1111", _password: "2234rrr" },
  ];

  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    const currentUsername = localStorage.getItem('username');
    if(currentUsername){
      setUser(usersData.find((user) => user._username == currentUsername));
      router.push('/');
    }
    else if(username==='Guest')
    {
      router.push('/');
    }
  }, [submitSuccess]);


  const handleSubmit = (event) => {
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
      localStorage.setItem('username', username);
      setSubmitSuccess(true);
      alert(`Welcome ${username}`);
      setErrorMessage("");
    } else {
      setErrorMessage("Username or password incorrect");
    }
  };

  const handleGuestClick = () => {
    setUsername('Guest');
    setSubmitSuccess(true);
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

  return (
      <main>
        <form id={"form"} onSubmit={handleSubmit}>
          <h1 className={styles["login-header"]}>Login</h1>

          <section className={styles.inputs}>
            <div>
              <input
                id={"username"}
                name={"_username"}
                type={"text"}
                placeholder={"username"}
                onChange={handleUsernameChange}
                value={username}
              />
              <input
                id={"password"}
                name={"_password"}
                type={"password"}
                placeholder={"password"}
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className={styles["error-message"]}>{errorMessage}</div>
          </section>

          <section className={styles["login-buttons-container"]}>
            <button className={styles["login-button"]} type={"submit"}>
              login
            </button>
            <button
              className={styles["guest-button"]}
              type={"button"}
              onClick={handleGuestClick}
            >
              join as guest
            </button>
          </section>
        </form>
      </main>
  );
}

export default Login;
