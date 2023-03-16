import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import authContext from '@contexts/authContext';

import './styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const {auth, userLogin} = useContext(authContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validCredentials, setValidCredentials] = useState(false);

  const [credentialsStatus, setCredentialsStatus] = useState({
    email: true,
    password: true,
  });

  const handleCredentialsChange = () => {
    if (email == '' || password.length < 6) return setValidCredentials(false);
    setValidCredentials(true);
  };

  // Use Effect hooks
  useEffect(handleCredentialsChange, [email, password]);
  useEffect(() => {
    if (auth.authenticated) return navigate('/');
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const error = await userLogin(email, password);

    if (error) {
      switch (error) {
        case 'ERR_USER_NO_EXISTS':
          setCredentialsStatus({
            email: false,
            password: false,
          });
          setEmail('');
          setPassword('');
          break;

        case 'ERR_INVALID_PASSWORD':
          setCredentialsStatus({
            email: true,
            password: false,
          });
          setPassword('');
          break;
      }
    }
  };

  return (
    <>
      <div className="login_main">
        <div className="additional_info_cont">
          <img
            src="/company_icon_light.png"
            className="comp_icon"
            height={256}
            width={512}
          />
          <div className="divider"></div>
          <span className="main_title">PIXEL MAIL</span>
        </div>
        <div className="form_cont">
          <form onSubmit={handleLogin} className="login_form">
            <h1>Welcome Back! Log In</h1>
            <div className="form_item">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                style={{
                  borderColor: credentialsStatus.email ?
                    '' :
                    'var(--secondary-red)',
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form_item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                style={{
                  borderColor: credentialsStatus.password ?
                    '' :
                    'var(--secondary-red)',
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Login" disabled={!validCredentials} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
