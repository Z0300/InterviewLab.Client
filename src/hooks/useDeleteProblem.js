import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useDeleteProblem = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id) => {
      await axiosPrivate.delete(`/problems/${id}`);
      return id;
    },
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
