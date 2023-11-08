import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Register, Login, Dashboard, ActivityDetails } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/activities/:id',
    element: <ActivityDetails/>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
