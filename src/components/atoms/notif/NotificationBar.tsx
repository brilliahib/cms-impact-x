import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Notification,
  NotificationCount,
} from "@/types/notification/notification";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface NotificationBarProps {
  data?: Notification[];
  count?: NotificationCount;
}

export function NotificationBar({ data, count }: NotificationBarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer p-0">
          <Bell size={25} />
          <span className="absolute top-3 -right-3 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs leading-none font-bold text-white">
            {count?.unread_count || 0}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b p-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {data && data.length > 0 ? (
            data.map((notif, i) => (
              <Link href={`/activity/${notif.activity_id}`} key={i}>
                <div className="cursor-pointer border-b p-3 transition hover:bg-gray-100">
                  <p className="text-sm">{notif.message}</p>
                  <span className="mt-1 block text-xs text-gray-500">
                    {notif.created_at
                      ? formatDistanceToNow(new Date(notif.created_at), {
                          addSuffix: true,
                          locale: enUS,
                        })
                      : ""}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
