import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.js";

const useUpdateSolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      await api.put(`/solutions/${id}`, payload).then((r) => r.data.data),
    onSuccess: async (data) => {
      const { id: solutionId, problemId } = data;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["problems", problemId, "solutions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["problems", problemId, "solutions", solutionId],
        }),
      ]);
    },
    onError: (err) => {
      console.error("Update solution failed", err);
      throw err;
    },
  });
};

export default useUpdateSolution;
