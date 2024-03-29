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

  const setNewAuth = (username, email, token) => {
    localStorage.setItem('token', token);
    setAuth({
      authenticated: true,
      token,
      userInfo: {
        username,
        email,
      },
    });
  };

  /**
    * Try to login using email and password
    * @async
    * @param {string} email - User's email
    * @param {string} password - User's password
    *
    * @example
    * userLogin("johndoe@email.com" , "abcd1234")
    *    .then(err => ...)
    *
    * @return {string | null}
    */
  const userLogin = async (email, password) => {
    const rawResponse = await fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (rawResponse.status !== 200) {
      // Error has occured
      const err = await rawResponse.json();

      switch (err.err_code) {
        case 'ERR_USER_NO_EXISTS':
          console.info('No user match the given email');
          break;

        case 'ERR_INVALID_PASSWORD':
          console.info('User entered the wrong password');
          break;

        case 'ERR_TOKEN_PARSE_ERR':
          console.info('Failed to parse token for user');
          break;

        case 'ERR_DB_ERROR':
        case 'ERR_SERVER_ERROR':
          console.info('Server error');
          break;
      }

      return err.err_code;
    }

    const response = await rawResponse.json();
    setNewAuth(response.user.user, response.user.email, response.token);

    return null;
  };

  /**
    * Try to login using email and password
    * @async
    *
    * @param {string} username - User's name
    * @param {string} email - User's email
    * @param {string} password - User's password
    *
    * @example
    * userSignUp("John Doe" , "johndoe@email.com" , "abcd1234")
    *    .then(err => ...)
    *
    * @return {string | null}
    */
  const userSignUp = async (username, email, password) => {
    const rawResponse = await fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (rawResponse.status !== 201) {
      const err = await rawResponse.json();
      return err.err_code;
    }

    return null;
  };

  /**
    * Log out of the current auth
    *
    * @example
    * userLogOut();
    *
    * @return {boolean} If the logout was success - True
    */
  const userLogOut = () => {
    localStorage.removeItem('token');
    setAuth({
      authenticated: false,
    });

    return true;
  };

  return (
    <authContext.Provider value={{auth, userLogin, userSignUp, userLogOut}}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
