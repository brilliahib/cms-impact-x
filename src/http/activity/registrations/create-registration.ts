import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { RegistrationType } from "@/validators/activity/registration/registration-validator";

export const CreateRegistrationHandler = async (
  body: RegistrationType,
  token: string,
) => {
  const { data } = await api.post(`/registrations`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateRegistration = (
  options?: UseMutationOptions<unknown, AxiosError, RegistrationType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateRegistrationHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
