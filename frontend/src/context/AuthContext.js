import React, { createContext, useState, useEffect } from 'react';
// import authService from '../services/authService';
import {login, register, logout, isAuthenticatedBool} from '../services/auth.service'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedBool());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticatedBool();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, [])

  const loginUser = async (email, password) => {
    const response = await login(email, password);
    setIsAuthenticated(true);
  };

  const logoutUser = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
