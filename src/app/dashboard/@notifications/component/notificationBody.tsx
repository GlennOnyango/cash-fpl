"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import CompetitionsNotifications from "@/components/notfications/competitionsNotifications";
import InboxNotifications from "@/components/notfications/inbox";
import "@/app/css/dashboard/notifications.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { NotificationsType } from "@/utils/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/app/actions";
import { redirect } from "next/navigation";

type Props = {
  token: string;
};

export default function NotificationBody({ token }: Props) {
  const [page, setPage] = useState(0);
  const {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["getNotifications", { page: page }],
    queryFn: async () => {
      const data = getNotifications(page);
      return data;
    },
  });

  const notificationsContent: NotificationsType[] = useMemo(() => {
    let notificationsContent: NotificationsType[] = [];
    if (data?.content) {
      notificationsContent = data.content.map((content: NotificationsType) => {
        return {
          createdBy: content.createdBy,
          createdAt: content.createdAt,
          lastModifiedBy: content.lastModifiedBy,
          lastModifiedAt: content.lastModifiedAt,
          id: content.id,
          title: content.title,
          message: content.message,
          receiverId: content.receiverId,
          category: content.category,
          read: content.read,
          dateRead: content.dateRead,
          new: content.new,
        };
      });

      return notificationsContent;
    }
    return [];
  }, [data]);

  const pageData = useMemo(() => {
    return {
      totalElements: data?.totalElements,
      totalPages: data?.totalPages,
      currentPage: data?.pageable.pageNumber + 1,
    };
  }, [data]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://ms-leagues.onrender.com/ws/notifications",
    {
      queryParams: {
        token: token,
      },
    }
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    console.log("Connection status: ", connectionStatus);
  }, [connectionStatus]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("Last message: ", lastMessage);
    }
  }, [lastMessage]);

  return (
    <div className="col-span-12 sm:col-span-3 row-span-6 p-0 bg-white">
      <div className="flex flex-row justify-between px-1 pt-2">
        <h4 className="text-xl text-black/90 dark:text-white/90 mb-4">
          Notifications
        </h4>

        <div className="flex flex-row justify-end">
          <span
            className="text-black/90 dark:text-white/90 text-sm"
            style={{ lineHeight: "2rem" }}
          >
            {`${page + 1} - ${(page + 1) * 10} of 15`}
          </span>
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
          <Button
            size="sm"
            variant="light"
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
      </div>
      {/* <p className="text-black/90">
        Status: {isConnected ? "connected" : "disconnected"}
      </p>
      <p className="text-black/90">Transport: {transport}</p> */}

      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          radius="none"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-warning",
            tab: "max-w-fit px-4 h-12 font-semibold",
            tabContent: "group-data-[selected=true]:text-warning",
          }}
        >
          <Tab
            key="inbox"
            title={
              <div className="flex items-center space-x-2 ">
                <span>Notice board </span>
                <Avatar
                  name={notificationsContent.length.toString()}
                  size="sm"
                  color="warning"
                />
              </div>
            }
          >
            <InboxNotifications notifications={notificationsContent} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
