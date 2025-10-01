import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const FollowUserHandler = async (username: string, token: string) => {
  const { data } = await api.post(
    `/follows/${username}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const useFollowUser = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (username: string) =>
      FollowUserHandler(username, session?.access_token ?? ""),
    ...options,
  });
};
