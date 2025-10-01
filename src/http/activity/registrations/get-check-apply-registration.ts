import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetCheckApplyRegistrationResponse {
  data: {
    applied: boolean;
  };
}

export const GetCheckApplyRegistrationHandler = async (
  id: number,
  token: string,
): Promise<GetCheckApplyRegistrationResponse> => {
  const { data } = await api.get<GetCheckApplyRegistrationResponse>(
    `/registrations/${id}/check`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetCheckApplyRegistration = (
  id: number,
  token: string,
  options?: Partial<
    UseQueryOptions<GetCheckApplyRegistrationResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["get-check-apply-registration", id],
    queryFn: () => GetCheckApplyRegistrationHandler(id, token),
    ...options,
  });
};
