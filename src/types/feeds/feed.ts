import { Activity } from "../activity/activity";
import { User } from "../user/user";

export interface Feed {
  id: number;
  user_id: number;
  activity_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  activity: Activity;
}
