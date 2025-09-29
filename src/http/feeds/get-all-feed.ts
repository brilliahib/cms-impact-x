import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";

interface GetAllFeedResponse {
  data: Feed[];
}

export const GetAllFeedHandler = async (
  token: string,
): Promise<GetAllFeedResponse> => {
  const { data } = await api.get<GetAllFeedResponse>(`/feeds`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllFeed = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllFeedResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["feed-user", token],
    queryFn: () => GetAllFeedHandler(token),
    ...options,
  });
};
