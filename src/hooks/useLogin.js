import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios.js";
import toast from "react-hot-toast";
import useAuth from "./useAuth.js";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post("/auth/login", payload);
      return response.data?.data;
    },
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data ?? {};

      if (!accessToken || !refreshToken) {
        toast.error("Invalid login response");
        return;
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuth((prev) => ({
        ...prev,
        accessToken,
        refreshToken,
      }));

      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Signed in successfully");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || err?.message || "Login failed";
      toast.error(message);
    },
  });
};

export default useLogin;
