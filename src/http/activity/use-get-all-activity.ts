import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Activity } from "@/types/activity/activity";

interface GetAllActivityResponse {
  data: Activity[];
}

export const GetAllActivityHandler = async (
  token: string,
): Promise<GetAllActivityResponse> => {
  console.log("🔑 Token yang dipakai:", token);

  const { data } = await api.get<GetAllActivityResponse>(`/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllActivity = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllActivityResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["activities", token],
    queryFn: () => GetAllActivityHandler(token),
    enabled: !!token,
    ...options,
  });
};
