import {
  ActivityPage,
  CreateActivity,
  Dashboard,
  ForgotPassword,
  Home,
  Landing,
  Login,
  ProfileForm,
  Register,
  ResetPassword,
  UpdatePassword,
  VerifyCode,
} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "landing",
        element: <Landing />,
    },
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "activity/:activityId",
        element: <ActivityPage />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "profileform",
        element: <ProfileForm />,
    },
    {
        path: "createactivity",
        element: <CreateActivity />,
    },
    {
        path: "updatepassword",
        element: <UpdatePassword />,
    },
    {
        path: "forgotpassword",
        element: <ForgotPassword />,
    },

    {
        path: "resetpassword",
        element: <ResetPassword />,
    },
    {
        path: "/resetPassword/:verificationCode/:email",
        element: <ResetPassword />,
    },
    {
        path: "/verifyCode/:verificationCode/:email",
        element: <VerifyCode />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
