import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

import React from "react";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoney</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
