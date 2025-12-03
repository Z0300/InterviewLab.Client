import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios.js";
import useAuth from "./useAuth.js";

const useRevokeToken = () => {
  const { resetAuth, auth } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const refreshToken =
        auth?.refreshToken || localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return null;
      }

      try {
        return await axios.delete("/auth/refresh-tokens", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
      } catch (error) {
        console.warn("Failed to revoke refresh token", error);
        return null;
      }
    },
    onSettled: () => {
      resetAuth();
    },
  });
};

export default useRevokeToken;
