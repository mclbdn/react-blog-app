import React from "react";
import logo from "../assets/logo.svg";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left_side_nav}>
      <img className={styles.logo} src={logo} />
        <a href="">Recent Articles</a>
        <a href="">About</a>
      </div>
      <div className={styles.right_side_nav}>
        <a href="">Log in</a>
      </div>
    </nav>
  );
};

export default Nav;
