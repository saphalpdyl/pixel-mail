import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Home from './Home';
import ProtectedComponent from '@utils/protectedComponent';
import authContext from '@contexts/authContext';

const HomeWrapper = () => {
  const navigate = useNavigate();
  const {auth} = useContext(authContext);

  useEffect(() => {
    if (Object.keys(auth).length && !auth.authenticated) {
      return navigate('/login');
    }
  }, [auth]);

  return (
    <ProtectedComponent
      Component={Home}
      authenticated={auth.authenticated || false}
    />
  );
};

export default HomeWrapper;
