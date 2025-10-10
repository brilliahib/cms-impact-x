import { User } from "@/types/user/user";

export interface ActivityChat {
  id: number;
  activity_id: number;
  user_id: number;
  message: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}
