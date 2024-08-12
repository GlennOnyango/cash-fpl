"use client";

import { getNotifications, revalidateTagExt } from "@/app/actions";
import { NotificationsType } from "@/utils/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button, Link } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";
import { useEffect, useLayoutEffect, useMemo } from "react";

type Props = {
  id: string;
  page: number;
};

export default function NotificationWindow({ id, page }: Props) {
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    // queryClient.invalidateQueries({
    //   queryKey: ["getNotifications", { page: page }],
    // });
    revalidateTagExt("getNotifications");
  }, []);

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

  const notification = useMemo(() => {
    if (data?.content) {
      return data?.content.find(
        (notification: NotificationsType) => notification.id === id
      );
    }
    return null;
  }, [data]);

  useEffect(() => {
    console.log("Notification---->", notification);
  }, [notification]);

  return (
    <div className="col-span-12 sm:col-span-3 row-span-6 grid grid-rows-9 px-4 pt-2 bg-red-50">
      <Button
        variant="light"
        size="sm"
        isIconOnly
        className="row-span-1"
        as={Link}
        href="/dashboard"
      >
        <ChevronLeftIcon />
      </Button>

      <h2 className="text-xl text-black/90 dark:text-white/90 mb-4 row-span-1">
        {notification?.title}
      </h2>

      <p className="text-black/90 dark:text-white/90 text-lg row-span-6">
        {notification?.message}
      </p>

      {notification?.category === "JOIN" && (
        <div className="w-full flex flex-row gap-1  row-span-1">
          <Button variant="bordered" radius="none" className="w-1/2">
            Join
          </Button>
          <Button variant="bordered" radius="none" className="w-1/2">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
