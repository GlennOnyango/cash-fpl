import { NotificationsType } from "@/utils/types";
import { capitalize } from "@/utils/utils";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";

type Props = {
  notifications: NotificationsType[];
};

export default function InboxNotifications({ notifications }: Props) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div
      className="overflow-y-auto p-2"
      style={{
        height: "38vh",
      }}
    >
      {notifications.map((notification) => {
        const date = new Date(notification.createdAt);

        return (
          <div
            key={notification.id}
            className="border-b border-divider pb-2 px-1"
          >
            <h2 className="text-black/90 dark:text-white/90 text-lg">
              {capitalize(notification.title)}
            </h2>

            <p className="text-gray-500 leading-7">{notification.message}</p>

            <div className="flex flex-row gap-2  justify-between my-2">
              <p className="text-black">
                {`${date.getDay()}-${
                  month[date.getMonth()]
                }-${date.getFullYear()}`}
              </p>

              <Button size="sm" color="warning">
                Pay
              </Button>

              <Button size="sm" color="warning" variant="ghost">
                Cancel
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
