import { createContext, useState, useEffect, useCallback, useContext } from "react";

import { authService, userService } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from localStorage if tokens exist
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      userService.getMe()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token invalid / expired and refresh failed → clean up
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Login with email + password.
   * Stores access/refresh tokens and sets user state.
   */
  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  }, []);

  /**
   * Register a new account.
   * name, email, password, confirm_password
   */
  const signup = useCallback(async (name, email, password, confirm_password) => {
    const data = await authService.register(name, email, password, confirm_password || password);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  }, []);

  /**
   * Logout — blacklist refresh token on backend, clear local state.
   */
  const logout = useCallback(async () => {
    const refresh = localStorage.getItem('refresh_token');
    try {
      if (refresh) await authService.logout(refresh);
    } catch (_) {
      // ignore network errors during logout
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Update the local user state (e.g., after profile update).
   */
  const refreshUser = useCallback(async () => {
    const userData = await userService.getMe();
    setUser(userData);
    return userData;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout, refreshUser }}>
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
