/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useUser, login, logout } from "../lib/auth";
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  const user = useUser();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth Example</title>
      </Head>

      <div>
        <h1>Auth Example</h1>
        {user !== null ? (
          <h2>ログインしている</h2>
        ) : (
          <h2>ログインしていない</h2>
        )}
        <button onClick={handleLogin}>ログイン</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Home;