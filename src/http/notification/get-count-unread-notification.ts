import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetCountUnreadNotificationResponse {
  data: {
    unread_count: number;
  };
}

export const GetCountUnreadNotificationHandler = async (
  token: string,
): Promise<GetCountUnreadNotificationResponse> => {
  const { data } = await api.get<GetCountUnreadNotificationResponse>(
    `/notifications/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetCountUnreadNotification = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetCountUnreadNotificationResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["get-count-unread-notification"],
    queryFn: () => GetCountUnreadNotificationHandler(token),
    ...options,
  });
};
