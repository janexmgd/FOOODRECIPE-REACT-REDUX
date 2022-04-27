import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/footer.module.css";
const Footer = () => {
  return (
    <>
      <footer clasname={styles.footer}>
        <div className={styles.footerJumbotron}>
          <h1>Eat, Cook, Repeat</h1>
          <h2>Share your best recipe by uploading here !</h2>
          <ul>
            <li>
              <Link to="#" className={styles.footerLink}>
                Product
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Company
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Learn more
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
