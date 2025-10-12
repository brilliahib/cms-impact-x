import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";

interface GetDetailFeedResponse {
  data: Feed;
}

export const GetDetailFeedHandler = async (
  id: number,
  token: string,
): Promise<GetDetailFeedResponse> => {
  const { data } = await api.get<GetDetailFeedResponse>(`/feeds/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailFeed = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailFeedResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["feed-user", id],
    queryFn: () => GetDetailFeedHandler(id, token),
    ...options,
  });
};
