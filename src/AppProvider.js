import { createContext, useContext, useState } from "react";

const context = createContext({ apolloClient: null });

export const useAppContext = () => useContext(context);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null
  });

  return (
    <context.Provider value={[state, setState]}>{children}</context.Provider>
  );
};
