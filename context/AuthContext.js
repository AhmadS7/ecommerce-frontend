import { createContext, useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router';
import { MAGIC_PUBLIC_KEY } from '../utils/urls';
const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  /**
   *adds email to user
   *
   * @param {string} email
   */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push('/');
    } catch (err) {
      onsole.log(err);
    }
  };

  /**
   *sets the user to email
   *
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push('/');
    } catch (err) {}
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });

        //testing delete this later
        const token = await getToken();
        console.log('checkUserLoggedIn token', token);
      }
    } catch (err) {}
  };

  /**
   *
   *retrieves tha magic issues bearer token
   * this allows user to make authenticated requests
   */

  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
