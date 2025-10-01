import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Activity } from "@/types/activity/activity";
import { ActivityType } from "@/validators/activity/activity-validator";

interface CreateActivityResponse {
  data: Activity;
}

export const CreateActivityHandler = async (
  body: ActivityType,
  token: string,
): Promise<CreateActivityResponse> => {
  const formData = new FormData();

  formData.append("title", body.title);
  formData.append("activity_type", body.activity_type);
  formData.append("location", body.location);
  formData.append("start_date", body.start_date);
  formData.append("end_date", body.end_date);
  formData.append("max_participants", body.max_participants.toString());
  formData.append("description", body.description);
  formData.append("requirements", body.requirements);

  body.activity_category.forEach((cat, i) => {
    formData.append(`activity_category[${i}]`, cat);
  });

  if (body.benefits) {
    formData.append("benefits", body.benefits);
  }

  if (body.images) {
    formData.append("images", body.images);
  }

  const { data } = await api.post("/activities", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useCreateActivity = (
  options?: UseMutationOptions<
    CreateActivityResponse,
    AxiosError<CreateActivityResponse>,
    ActivityType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ActivityType) =>
      CreateActivityHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
