import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetPredictionExistsResponse {
  data: {
    hasCareerPrediction: boolean;
  };
}

export const GetPredictionExistsHandler = async (
  token: string,
): Promise<GetPredictionExistsResponse> => {
  const { data } = await api.get<GetPredictionExistsResponse>(
    `/works/predict/exists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetPredictionExists = (
  token: string,
  options?: Partial<UseQueryOptions<GetPredictionExistsResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-prediction-exists"],
    queryFn: () => GetPredictionExistsHandler(token),
    ...options,
  });
};
