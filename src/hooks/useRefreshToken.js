import { useCallback } from "react";
import axios from "../api/axios.js";
import useAuth from "./useAuth.js";

const getStoredRefreshToken = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem("refreshToken") ?? "";
};

const useRefreshToken = () => {
  const { setAuth, resetAuth } = useAuth();

  return useCallback(async () => {
    const storedRefreshToken = getStoredRefreshToken();

    if (!storedRefreshToken) {
      resetAuth();
      return null;
    }

    try {
      const response = await axios.post("/auth/refresh-token", {
        refreshToken: storedRefreshToken,
      });

      const { accessToken, refreshToken } = response.data?.data ?? {};

      if (!accessToken || !refreshToken) {
        throw new Error("Invalid refresh token response");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      setAuth((prev) => ({
        ...prev,
        accessToken,
        refreshToken,
      }));

      return accessToken;
    } catch (error) {
      resetAuth();
      throw error;
    }
  }, [resetAuth, setAuth]);
};

export default useRefreshToken;

