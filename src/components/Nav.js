import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.svg";
import styles from "./Nav.module.scss";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.left_side_nav}>
        <img className={styles.logo} alt="logo" src={logo} />
        <a href="/">Recent Articles</a>
        <a href="">About</a>
      </div>
      <div className={styles.right_side_nav}>
        {isLoggedIn ? (
          <div>
            <a href="/createarticle">Create Article</a> <FontAwesomeIcon className={styles.logout_btn} icon={faArrowRightFromBracket} />
          </div>
        ) : (
          <a href="/login">Log in</a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
