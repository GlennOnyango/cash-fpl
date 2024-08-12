import { NotificationsType } from "@/utils/types";
import { capitalize } from "@/utils/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  notifications: NotificationsType[];
  page: number;
  pageData: {
    totalElements: number;
    currentPage: number;
    totalPages: number;
  };
  refetch: () => void;
  setPage: (page: number) => void;
  sendMessage: (message: string) => void;
  setNotiId: (id: string) => void;
};

export default function InboxNotifications({
  notifications,
  page,
  pageData,
  refetch,
  setPage,
  sendMessage,
  setNotiId,
}: Props) {
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
    <>
      <div
        className="overflow-y-auto"
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
                notifications.length === idx + 1
                  ? ""
                  : "border-b border-divider"
              }
            ${notification.read ? "bg-gray-50 dark:bg-gray-800" : ""}
             grid grid-cols-3 cursor-pointer p-2 py-4`}
              onClick={() => {
                sendMessage(`${notification.id}`);
                setNotiId(notification.id);
                // router.push(
                //   `/dashboard?notification_id=${notification.id}&page=${page}`
                // );
              }}
            >
              <h2
                className={` ${
                  notification.read
                    ? "text-gray-500"
                    : "text-black/90 dark:text-white/90 font-semibold"
                } text-xl text-wrap col-span-2`}
              >
                {`${capitalize(notification.title)} ${page}${idx}`}
              </h2>

              <p
                className={`${
                  notification.read ? "text-gray-500" : "text-black"
                } col-span-1`}
              >
                {`${date.getDate()}-${
                  month[date.getMonth()]
                }-${date.getFullYear()}`}
              </p>

              <p
                className={`${
                  notification.read
                    ? "text-gray-500"
                    : "text-black/90 dark:text-white/90"
                } leading-7 col-span-3 truncate`}
              >
                {capitalize(notification.message)}
              </p>

              {/* <p className="text-gray-500 leading-7 col-span-3">
              {notification.message}
            </p> */}
            </div>
          );
        })}
      </div>

      <div className="flex flex-row justify-center">
        <Button
          size="sm"
          isIconOnly
          variant="light"
          className={
            pageData.currentPage === 1 ? "text-gray-300" : "text-black"
          }
          onClick={() => {
            if (pageData.currentPage === 1) return;
            setPage(page - 1);
            refetch();
          }}
        >
          <ChevronLeftIcon className="text-sm" />
        </Button>
        <span
          className="text-black/90 dark:text-white/90 text-sm px-2"
          style={{ lineHeight: "2rem" }}
        >
          {`${pageData.currentPage * 10 - 10 + 1} - ${
            pageData.currentPage * 10
          } of ${pageData.totalElements}`}
        </span>

        <Button
          size="sm"
          variant="light"
          isIconOnly
          className={
            pageData.currentPage === pageData.totalPages
              ? "text-gray-300"
              : "text-black"
          }
          onClick={() => {
            if (pageData.currentPage === pageData.totalPages) return;
            setPage(page + 1);
            refetch();
          }}
        >
          <ChevronRightIcon className="text-sm" />
        </Button>
      </div>
    </>
  );
}
