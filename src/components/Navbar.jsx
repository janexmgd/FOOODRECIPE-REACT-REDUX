import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/navbar.module.css";
const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link className={styles.navbarLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.navbarLink} to="/addrecipe">
              Add Recipe
            </Link>
          </li>
          <li>
            <Link className={styles.navbarLink} to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
