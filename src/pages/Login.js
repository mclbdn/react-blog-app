import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formHasErrors, setFormHasErrors] = useState();

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("https://fullstack.exercise.applifting.cz/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      localStorage.setItem("access_token", data.access_token);
    } else if (response.status === 401) {
      setFormHasErrors({
        message: "API key is invalid!",
      });
    } else if (response.status === 400) {
      setFormHasErrors({
        message: "Invalid login credentials!",
      });
    }
  };

  return (
    <>
      <Nav />
      <main>
        <form onSubmit={login}>
          {formHasErrors && <p className={styles.form_error}>{formHasErrors.message}</p>}
          <h1 className={styles.h1}>Log In</h1>
          <div className={styles.form_content}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="me"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Log in</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
