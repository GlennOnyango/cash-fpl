import { NotificationsType } from "@/utils/types";
import { capitalize } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  notifications: NotificationsType[];
  page: number;
};

export default function InboxNotifications({ notifications, page }: Props) {
  const router = useRouter();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className="overflow-y-auto p-2"
      style={{
        height: "38vh",
      }}
    >
      {notifications.map((notification, idx) => {
        const date = new Date(notification.createdAt);

        return (
          <div
            key={notification.id}
            className={`${
              notifications.length === idx + 1 ? "" : "border-b border-divider"
            }
            ${notification.read ? "bg-gray-100 dark:bg-gray-800" : ""}
            py-2 grid grid-cols-3 cursor-pointer`}
            onClick={() => {
              router.push(
                `/dashboard?notification_id=${notification.id}&page=${page}`
              );
            }}
          >
            <h2 className="text-black/90 dark:text-white/90 text-xl font-semibold text-wrap col-span-2">
              {capitalize(notification.title)}
            </h2>

            <p className="text-black col-span-1 ">
              {`${date.getDate()}-${
                month[date.getMonth()]
              }-${date.getFullYear()}`}
            </p>

            <p className="text-black/90 dark:text-white/90 leading-7 col-span-3 truncate">
              {capitalize(notification.message)}
            </p>

            {/* <p className="text-gray-500 leading-7 col-span-3">
              {notification.message}
            </p> */}
          </div>
        );
      })}
    </div>
  );
}
