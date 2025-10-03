import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Notification } from "@/types/notification/notification";

interface GetAllNotificationResponse {
  data: Notification[];
}

export const GetAllNotificationHandler = async (
  token: string,
): Promise<GetAllNotificationResponse> => {
  const { data } = await api.get<GetAllNotificationResponse>(`/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllNotification = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllNotificationResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-notification"],
    queryFn: () => GetAllNotificationHandler(token),
    ...options,
  });
};
