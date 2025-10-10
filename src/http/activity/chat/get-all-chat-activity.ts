import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ActivityChat } from "@/types/activity/chat/activity-chat";

interface GetAllChatActivityResponse {
  data: ActivityChat[];
}

export const GetAllChatActivityHandler = async (
  id: number,
  token: string,
): Promise<GetAllChatActivityResponse> => {
  const { data } = await api.get<GetAllChatActivityResponse>(`/chats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllChatActivity = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetAllChatActivityResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-chat-activity", id],
    queryFn: () => GetAllChatActivityHandler(id, token),
    ...options,
  });
};
