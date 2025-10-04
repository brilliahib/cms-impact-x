export interface Notification {
  id: number;
  user_id: number;
  activity_id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationCount {
  unread_count: number;
}
