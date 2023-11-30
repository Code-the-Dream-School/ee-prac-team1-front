import { createContext, useState } from 'react';

const userDataContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </userDataContext.Provider>
  );
};
export { userDataContext, UserContextProvider };
