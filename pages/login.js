import Head from 'next/head';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const { loginUser } = useContext(AuthContext);

  const handleUser = (event) => {
    event.preventDefault();
    loginUser(email);
  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login here to buy" />
      </Head>

      <h2>Login</h2>
      <form onSubmit={handleUser}>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
