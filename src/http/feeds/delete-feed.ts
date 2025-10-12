import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";

interface DeleteFeedPayload {
  id: number;
  token: string;
}

interface DeleteFeedResponse {
  data: Feed;
}

export const DeleteFeedHandler = async ({
  id,
  token,
}: DeleteFeedPayload): Promise<DeleteFeedResponse> => {
  const { data } = await api.delete(`/feeds/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteFeed = (
  options?: UseMutationOptions<
    DeleteFeedResponse,
    AxiosError<unknown>,
    DeleteFeedPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteFeedHandler,
    ...options,
  });
};
