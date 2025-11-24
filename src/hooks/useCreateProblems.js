import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useCreateProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) =>
      await api.post("/problems", payload).then((r) => r.data.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (err) => {
      console.error("Create problem failed", err);
      throw err;
    },
  });
};

export default useCreateProblem;
