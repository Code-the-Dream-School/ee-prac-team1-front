import {
  Dashboard,
  Login,
  ProfileForm,
  Register,
  UpdatePassword,
  ForgotPassword,
  CreateActivity,
  ActivityPage,
  ResetPassword,
  LandingPage,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/landing",
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
