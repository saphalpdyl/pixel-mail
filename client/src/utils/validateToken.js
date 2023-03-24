/**
 * @author @saphalpdyl
 *
 * Validates and returns user info if success
 * On Error : Redirects to login page
 *
 * @param {Function} callback Callback function
 *
 * @return {[string , string]} username and email
 */
const validateToken = async (callback) => {
  const token = localStorage.getItem('token');

  // If there is no token , Redirect
  if (!token) {
    return callback({err: 'Missing token'}, null);
  }

  const rawResponse = await fetch('http://localhost:9000/validate', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // If token is invalid , Redirect
  if (rawResponse.status !== 202) {
    return callback({err: 'Invalid Token'}, null);
  }

  const response = await rawResponse.json();

  callback(null, response);
};

export default validateToken;
