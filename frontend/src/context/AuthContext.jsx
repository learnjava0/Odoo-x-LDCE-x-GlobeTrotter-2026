import React, { createContext, useContext, useState, useCallback } from 'react';
import { currentUser as mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock: always logged in

  const login = useCallback((email, password) => {
    // Mock login — in production, call /api/auth/login/
    setUser(mockUser);
    setIsAuthenticated(true);
    return Promise.resolve(mockUser);
  }, []);

  const signup = useCallback((name, email, password) => {
    // Mock signup — in production, call /api/auth/signup/
    setUser({ ...mockUser, name, email });
    setIsAuthenticated(true);
    return Promise.resolve({ ...mockUser, name, email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
