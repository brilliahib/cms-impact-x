import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ActivityRegistration } from "@/types/activity/registration/activity-registration";

interface GetAllActivityRegistrationResponse {
  data: ActivityRegistration[];
}

export const GetAllActivityRegistrationHandler = async (
  id: number,
  token: string,
): Promise<GetAllActivityRegistrationResponse> => {
  const { data } = await api.get<GetAllActivityRegistrationResponse>(
    `/registrations?activity_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllActivityRegistration = (
  id: number,
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllActivityRegistrationResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["get-all-activity-registration", id],
    queryFn: () => GetAllActivityRegistrationHandler(id, token),
    ...options,
  });
};
