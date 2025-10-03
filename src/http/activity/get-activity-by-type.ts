import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Activity } from "@/types/activity/activity";

interface GetAllActivityByTypeResponse {
  data: Activity[];
}

export const GetAllActivityByTypeHandler = async (
  token: string,
  name?: string,
): Promise<GetAllActivityByTypeResponse> => {
  const endpoint = name
    ? `/activities/type?activity_type=${name}`
    : `/activities/type`;

  const { data } = await api.get<GetAllActivityByTypeResponse>(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllActivityByType = (
  token: string,
  name: string | undefined,
  options?: Partial<UseQueryOptions<GetAllActivityByTypeResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-activity-by-type", name],
    queryFn: () => GetAllActivityByTypeHandler(token, name),
    enabled: !!token,
    ...options,
  });
};
