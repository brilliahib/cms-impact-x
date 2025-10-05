import { Activity } from "../activity/activity";
import { User } from "../user/user";

export interface Feed {
  id: number;
  user_id: number;
  activity_id: number;
  content: string;
  total_likes: number;
  total_comments: number;
  is_liked: boolean;
  created_at: Date;
  updated_at: Date;
  user: User;
  activity: Activity;
}
