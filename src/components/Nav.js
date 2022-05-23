import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.svg";
import styles from "./Nav.module.scss";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

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
        <a href="/">About</a>
      </div>
      <div className={styles.right_side_nav}>
        {isLoggedIn ? (
          <div>
            <a href="/myarticles">My Articles</a>
            <a href="/newarticle">Create Article</a> <FontAwesomeIcon className={styles.logout_btn} onClick={logout} icon={faArrowRightFromBracket} />
          </div>
        ) : (
          <a href="/login">Log in</a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
