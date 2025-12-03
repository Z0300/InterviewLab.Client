import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

const DEFAULT_AUTH_STATE = {
  user: null,
  accessToken: "",
  refreshToken: "",
};

const createDefaultState = () => ({ ...DEFAULT_AUTH_STATE });

const getStoredTokens = () => {
  if (typeof window === "undefined") {
    return { accessToken: "", refreshToken: "" };
  }

  return {
    accessToken: localStorage.getItem("token") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
  };
};

const AuthContext = createContext({
  auth: DEFAULT_AUTH_STATE,
  setAuth: () => {},
  resetAuth: () => {},
  isAuthReady: false,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    ...createDefaultState(),
    ...getStoredTokens(),
  }));
  const isAuthReady = typeof window !== "undefined";

  const resetAuth = useCallback(() => {
    setAuth(createDefaultState());
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }, []);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      resetAuth,
      isAuthReady,
    }),
    [auth, isAuthReady, resetAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
