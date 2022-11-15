import { createContext, useContext, useState } from "react";

const initalState = { user: null, toSummary: null }
const context = createContext([initalState, (state) => {}]);

export const useAppContext = () => useContext(context);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initalState);

  return (
    <context.Provider value={[state, setState]}>{children}</context.Provider>
  );
};
