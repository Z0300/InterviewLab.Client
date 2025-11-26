import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useAddSolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) =>
      await api.post("/solutions", payload).then((r) => r.data.data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["problems", data.data.problemId],
      });
    },
    onError: (err) => {
      console.error("Add solution failed", err);
      throw err;
    },
  });
};

export default useAddSolution;
