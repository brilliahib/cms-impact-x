import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Activity } from "@/types/activity/activity";

interface GetAllActivityUserResponse {
  data: Activity[];
}

export const GetAllActivityUserHandler = async (
  username: string,
  token: string,
): Promise<GetAllActivityUserResponse> => {
  const { data } = await api.get<GetAllActivityUserResponse>(
    `/activities/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllActivityUser = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllActivityUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["activity-user", username],
    queryFn: () => GetAllActivityUserHandler(username, token),
    ...options,
  });
};
