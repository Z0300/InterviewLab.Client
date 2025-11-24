import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useUpdateProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      await api.put(`/problems/${id}`, payload).then((r) => r.data.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (err) => {
      console.error("Update problem failed", err);
      throw err;
    },
  });
};

export default useUpdateProblem;
