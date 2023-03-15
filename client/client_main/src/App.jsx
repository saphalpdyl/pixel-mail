import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './routes/Login/Login';
import HomeWrapper from '@src/routes/Home/HomeWrapper';

function App() {
  const pageRouter = createBrowserRouter([
    {
      path: '/',
      element: <HomeWrapper />,
      errorElement: <div>Error Occured</div>,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={pageRouter} />
    </div>
  );
}

export default App;
