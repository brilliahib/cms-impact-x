import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";

interface GetAllFeedResponse {
  data: Feed[];
}

export const GetAllFeedHandler = async (): Promise<GetAllFeedResponse> => {
  const { data } = await api.get<GetAllFeedResponse>(`/feeds`, {});

  return data;
};

export const useGetAllFeed = (
  options?: Partial<UseQueryOptions<GetAllFeedResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-feed"],
    queryFn: () => GetAllFeedHandler(),
    ...options,
  });
};
