import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const PredictCareerHandler = async (token: string) => {
  const { data } = await api.post(
    "/works/predict",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const usePredictCareer = (
  options?: UseMutationOptions<unknown, AxiosError>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: () => PredictCareerHandler(session?.access_token ?? ""),
    ...options,
  });
};
