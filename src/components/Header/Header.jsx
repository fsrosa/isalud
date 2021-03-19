import React from "react";
import Link from "next/link";

import { AiOutlineTablet } from "react-icons/ai";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Link href="/" className={styles.headerLogoContainer}>
          <p className={styles.headerLogo}>iSalud</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
