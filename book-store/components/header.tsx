// components/Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import AuthPopup from "@/components/authPopup";
import { montserratFont } from "@/fonts"; // Импортируем шрифт

const Header: React.FC = () => {
  const [isAuthPopupVisible, setAuthPopupVisible] = useState(false);
  const [isProfileHovered, setProfileHovered] = useState(false);

  const handleProfileClick = () => {
    setAuthPopupVisible(!isAuthPopupVisible);
  };

  return (
    <header className={`${styles.header} ${montserratFont.className}`}>
      <h1 className={styles.title}>Bookshop</h1>
      <nav>
        <ul className={styles.shop_menu}>
          <li>
            <Link href="/">BOOKS</Link>
          </li>
          <li>
            <Link href="/audiobooks">AUDIOBOOKS</Link>
          </li>
          <li>
            <Link href="/stationery&gifts">STATIONERY & GIFTS</Link>
          </li>
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
        </ul>
      </nav>
      <div
        className={styles.profile_icon_container}
        style={{ zIndex: isProfileHovered ? 2 : 1 }}
      >
        <Link href="/profile">
          <img
            src="/user.svg"
            alt="Profile Icon"
            className={styles.profile_icon}
            onClick={handleProfileClick}
          />
          {isAuthPopupVisible && (
            <AuthPopup
              onLogin={() => {
                /* Добавьте логику обработки входа */
              }}
            />
          )}
        </Link>
      </div>
      <Link href="/cart">
        <img
          src="/shop bag.svg"
          alt="Basket Icon"
          style={{ width: "12px", height: "15px" }}
        />
      </Link>
    </header>
  );
};

export default Header;
