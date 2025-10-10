import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ActivityChatType } from "@/validators/activity/chat/activity-chat-validator";

export const CreateChatActivityHandler = async (
  body: ActivityChatType,
  token: string,
) => {
  const { data } = await api.post(`/chats`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateChatActivity = (
  options?: UseMutationOptions<unknown, AxiosError, ActivityChatType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateChatActivityHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
