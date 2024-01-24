// components/Layout.tsx
import React from "react";
import Head from "next/head";
import Header from "./header";
import styles from "./layout.module.css";
import BookList from "./booklist";

interface LayoutProps {
  children: React.ReactNode;
  showBookList?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBookList = true }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>BOOKSHOP</title>
        <meta name="description" content="Bookshop for your reading" />
        <meta name="author" content="ilklmv" />
      </Head>
      <Header />
      <main>{children}</main>
      {showBookList && <BookList />}
    </div>
  );
};

export default Layout;
