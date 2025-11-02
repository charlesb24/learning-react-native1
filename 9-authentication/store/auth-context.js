import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [ token, setToken ] = useState(null);

  function authenticate(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  );
}