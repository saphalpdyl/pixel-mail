import {useContext, useEffect, useState} from 'react';
import './styles/Signup.css';

import authContext from '@contexts/authContext';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validationStatus, setValidationStatus] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [showNoUserErr, setShowNoUserErr] = useState(false);

  const {userSignUp} = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      email !== '' &&
      username !== '' &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      setValidationStatus(true);
    } else setValidationStatus(false);

    if (password === confirmPassword) setPasswordEqual(true);
    else setPasswordEqual(false);

    if (password.length >= 6) setPasswordStrong(true);
    else setPasswordStrong(false);
  }, [email, username, password, confirmPassword]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (validationStatus) {
      userSignUp(username, email, password).then((err) => {
        if (err) {
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setShowNoUserErr(true);
          return;
        }

        navigate('/login');
      });
    }
  };

  return (
    <>
      <div className="signup_main">
        <div className="header_cont">
          <span className="signup_quote">
            <span>Join the</span>
            <span>PIXEL</span>
            <span>network</span>
          </span>
        </div>
        <div className="form_cont signup_cont">
          <form onSubmit={handleSignIn} method="POST" className="signup_form">
            <div className="form_item">
              <label htmlFor="username">Username</label>
              <div className="input_cont">
                <input
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>
            <div className="form_item">
              <label htmlFor="email">Email</label>
              <div className="input_cont">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <span
                className="error_text"
                style={{
                  opacity: showNoUserErr ? 1 : 0,
                  cursor: 'default',
                }}
              >
                A user is already associated with this email
              </span>
            </div>
            <div className="form_item">
              <label htmlFor="password">Password</label>
              <div className="input_cont">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  style={{
                    borderColor: 'var(--gray-20)',
                    outlineWidth: '2px',
                    outlineStyle: 'solid',
                    outlineColor:
                      password == '' ?
                        'transparent' :
                        passwordStrong ?
                        'var(--primary-green)' :
                        'var(--secondary-red)',
                  }}
                />
              </div>
            </div>
            <div className="form_item">
              <label htmlFor="passwordConfirm">Confirm password</label>
              <div className="input_cont">
                <input
                  type="password"
                  name="passwordConfirm"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  style={{
                    borderColor: 'var(--gray-20)',
                    outlineWidth: '2px',
                    outlineStyle: 'solid',
                    outlineColor:
                      password == '' ?
                        'transparent' :
                        passwordEqual ?
                        'var(--primary-green)' :
                        'var(--secondary-red)',
                  }}
                />
              </div>
            </div>

            <input type="submit" value="Sign up" disabled={!validationStatus} />
            <Link to="/login">Already Signed up ? Log In instead</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
