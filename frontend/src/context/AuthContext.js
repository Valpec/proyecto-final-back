
import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout, isAuthenticatedBool } from '../services/auth.service';
import { getJwtFromCookies, getUserFromToken } from '../services/cookie.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedBool());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const authenticated = await isAuthenticatedBool();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const token = getUserFromToken();
        setUser(token);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginUser = async (email, password) => {
    const response = await login(email, password);
    setIsAuthenticated(true);
    const token = getUserFromToken();
    setUser(token);
  };

  const logoutUser = async () => {
    await logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
