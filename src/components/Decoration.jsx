import React from "react";
import styles from "../assets/styles/decoration.module.css";
import logo from "../assets/images/logo.svg";
const Decoration = () => {
  return (
    <>
      <div className={styles.decoration}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImg}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.logoText}>Mama Recipe</div>
        </div>
      </div>
    </>
  );
};
export default Decoration;
