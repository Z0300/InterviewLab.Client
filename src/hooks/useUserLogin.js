import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";
import toast from "react-hot-toast";

const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => await api.post("/auth/login", payload),
    onSuccess: async ({ data }) => {
      const token = data.data;
      if (token) {
        localStorage.setItem("token", token);
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
};

export default useUserLogin;
