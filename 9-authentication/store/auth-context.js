import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    AsyncStorage.setItem('auth-token', token);
  }

  function logout() {
    setToken(null);
    AsyncStorage.removeItem('auth-token');
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