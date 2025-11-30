import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { INITIAL_USER } from "../contants/initialUser.js";
import useCurrentUser from "../hooks/useCurrentUser.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token");
    } catch {
      //
    } finally {
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
