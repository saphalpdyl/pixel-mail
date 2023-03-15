import {useEffect, useState} from 'react';
import authContext from '@contexts/authContext';

import validateToken from '@utils/validateToken.js';

const AuthProvider = (props) => {
  /**
   * @typedef {Object} Auth
   *
   * @property {boolean} authenticated Whether the user is authenticated or not.
   * @property {string} token JWT token
   * @property {Object} userInfo - Information about the user.
   * @property {string} userInfo.username - The user's username.
   * @property {string} userInfo.email - The user's email address.
   */
  const [auth, setAuth] = useState(/** @type {Auth} */ ({}));

  useEffect(() => {
    validateToken((err, result) => {
      if (err) {
        localStorage.removeItem('token');
        return setAuth({authenticated: false});
      }

      const {username, email} = result;
      const token = localStorage.getItem('token');

      setAuth({
        authenticated: true,
        token,
        userInfo: {
          username,
          email,
        },
      });
    });
  }, []);

  return (
    <authContext.Provider value={{auth}}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
