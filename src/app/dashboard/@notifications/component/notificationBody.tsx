"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Avatar, Badge, Button, Spinner, Tab, Tabs } from "@nextui-org/react";
import InboxNotifications from "@/components/notfications/inbox";
import "@/app/css/dashboard/notifications.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { NotificationsType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/app/actions";
import { useRouter } from "next/navigation";
import { NotificationIcon } from "@/components/icons/Notifications";
import NotificationWindow from "@/components/notfications/NotificationWindow";

type Props = {
  token: string;
};

export default function NotificationBody({ token }: Props) {
  const router = useRouter();
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://ms-leagues.onrender.com/ws/notifications",
    {
      queryParams: {
        token: token,
      },
    }
  );
  const [notiId, setNotiId] = useState<string | null>(null);
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

  useLayoutEffect(() => {
    if (data?.message === "UNAUTHORIZED") {
      router.push("/api/auth/logout");
    }
  }, [data]);

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
        };
      });

      return notificationsContent;
    }
    return [];
  }, [data]);

  const pageData = useMemo(() => {
    return {
      totalElements: data?.totalElements || 0,
      totalPages: data?.totalPages || 1,
      currentPage: data?.pageable.pageNumber + 1 || 1,
    };
  }, [data]);

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
    <>
      <div className="row-span-1 flex flex-row justify-between px-4 pt-2">
        <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
          Notifications
        </h4>

        <div className="flex flex-row justify-end">
          <span
            className="text-black/90 dark:text-white/90 text-sm"
            style={{ lineHeight: "2rem" }}
          >
            {lastMessage !== null ? (
              <Badge content="new" shape="circle" color="danger">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                >
                  <NotificationIcon size={24} />
                </Button>
              </Badge>
            ) : (
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="light"
              >
                <NotificationIcon size={24} />
              </Button>
            )}
          </span>
        </div>
      </div>

      <div className={`row-span-9 flex flex-col `}>
        {isLoading ? (
          <div className="h-9/10 flex flex-col justify-center">
            <Spinner label="Loading..." color="warning" size="lg" />
          </div>
        ) : (
          <Tabs
            aria-label="Options"
            radius="none"
            variant="underlined"
            classNames={{
              base: "w-full h-1/10",
              tabList: "gap-0 w-full relative rounded-none p-0 border-b",
              cursor: "w-full bg-warning",
              tab: "max-w-fit px-4 h-12 font-semibold",
              tabContent: "group-data-[selected=true]:text-warning",
              panel: "p-0 h-9/10 flex flex-col",
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
              {notiId ? (
                <NotificationWindow
                  setNotiId={setNotiId}
                  id={notiId}
                  page={page}
                />
              ) : (
                <InboxNotifications
                  notifications={notificationsContent}
                  page={page}
                  pageData={pageData}
                  refetch={refetch}
                  setPage={setPage}
                  sendMessage={sendMessage}
                  setNotiId={setNotiId}
                />
              )}
            </Tab>
          </Tabs>
        )}
      </div>
    </>
  );
}
