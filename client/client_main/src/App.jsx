import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './routes/Login/Login';
import HomeWrapper from './routes/Home/HomeWrapper';
import Signup from './routes/Signup/Signup';

function App() {
  const pageRouter = createBrowserRouter([
    {
      path: '/',
      element: <HomeWrapper />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={pageRouter} />
    </div>
  );
}

export default App;
