import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useUpdateSolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      await api.put(`/solutions/${id}`, payload).then((r) => r.data.data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["problems", data.data.problemId],
      });
    },
    onError: (err) => {
      console.error("Update solution failed", err);
      throw err;
    },
  });
};

export default useUpdateSolution;
