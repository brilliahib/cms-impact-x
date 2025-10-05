import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const CreateLikeFeedHandler = async (id: number, token: string) => {
  const { data } = await api.post(
    `/feeds/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const useCreateLikeFeed = (
  options?: UseMutationOptions<unknown, AxiosError, number>,
) => {
  const { data: session } = useSession();
  const token = session?.access_token ?? "";

  return useMutation({
    mutationFn: (id: number) => CreateLikeFeedHandler(id, token),
    ...options,
  });
};
