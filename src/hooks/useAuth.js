import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(
    context.auth,
    (auth) => (auth?.accessToken ? "Authenticated" : "Anonymous"),
  );
  return context;
};

export default useAuth;
