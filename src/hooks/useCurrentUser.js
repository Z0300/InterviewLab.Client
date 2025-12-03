import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";
import useAuth from "./useAuth.js";

const useCurrentUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth, resetAuth } = useAuth();
  return useQuery({
    queryKey: ["currentUser", auth.accessToken],
    queryFn: async () =>
      await axiosPrivate
        .get("/me")
        .then((res) => res.data)
        .catch((err) => err.response.data),
    enabled: Boolean(auth?.accessToken),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (user) => {
      setAuth((prev) => ({ ...prev, user }));
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        resetAuth();
      }
    },
  });
};

export default useCurrentUser;
