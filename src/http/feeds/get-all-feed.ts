import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";
import { useSession } from "next-auth/react";

interface GetAllFeedResponse {
  data: Feed[];
}

export const GetAllFeedHandler = async (
  token?: string,
): Promise<GetAllFeedResponse> => {
  const { data } = await api.get<GetAllFeedResponse>(`/feeds`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return data;
};

export const useGetAllFeed = (
  token?: string,
  options?: Partial<UseQueryOptions<GetAllFeedResponse, AxiosError>>,
) => {
  const { data: session } = useSession();

  const finalToken = token || session?.access_token || session?.access_token;

  return useQuery({
    queryKey: ["get-all-feed", finalToken ? "auth" : "guest"],
    queryFn: () => GetAllFeedHandler(finalToken),
    ...options,
  });
};
