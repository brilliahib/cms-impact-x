import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Activity } from "@/types/activity/activity";

interface GetDetailActivityResponse {
  data: Activity;
}

export const GetDetailActivityHandler = async (
  id: number,
  token: string,
): Promise<GetDetailActivityResponse> => {
  const { data } = await api.get<GetDetailActivityResponse>(
    `/activities/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailActivity = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailActivityResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-detail-activity", id],
    queryFn: () => GetDetailActivityHandler(id, token),
    ...options,
  });
};
