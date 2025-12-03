import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useUpdateProblem = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await axiosPrivate.put(`/problems/${id}`, payload);
      return response.data?.data;
    },
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
