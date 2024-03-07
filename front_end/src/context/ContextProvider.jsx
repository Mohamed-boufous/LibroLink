import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: "",
  setCurrentUser: () => {},
  currentToken: null,
  setCurrentToken: () => {},
});
console.log("MyProvider rendered (current value:)");

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    userName: null,
    displayName: null,
    image: null,
    email: null,
    bio: null,
    created_at: null,
    etat_abonnement: null,
    date_birth: null,
    updated_at: null,
    email_verified_at: null,
  });
  const [currentToken, setCurrentToken] = useState(null);
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentToken,
        setCurrentToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
