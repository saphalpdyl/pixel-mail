import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Home from './Home';
import ProtectedComponent from './lib/utils/protectedComponent';
import validateToken from './lib/utils/validateToken';

const HomeWrapper = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateToken((err, result) => {
      if (err) return navigate('/login');

      setAuthenticated(true);
      console.log(result);
    });
  }, []);

  return <ProtectedComponent Component={Home} authenticated={authenticated} />;
};

export default HomeWrapper;
