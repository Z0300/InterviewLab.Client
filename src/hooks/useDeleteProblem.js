import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useDeleteProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>
      await api.delete(`/problems/${id}`).then((r) => r.data.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (err) => {
      console.error("Delete problem failed", err);
      throw err;
    },
  });
};

export default useDeleteProblem;
