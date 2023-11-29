import {
  Dashboard,
  Login,
  ProfileForm,
  Register,
  CreateActivity,
} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'profileform',
    element: <ProfileForm />,
  },
  {
    path: 'createactivity',
    element: <CreateActivity />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
