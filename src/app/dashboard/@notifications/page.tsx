"use client";

import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { Avatar, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import CompetitionsNotifications from "@/components/notfications/competitionsNotifications";
import InboxNotifications from "@/components/notfications/inbox";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import "@/app/css/dashboard/notifications.css";

export default function Notifications() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="col-span-12 sm:col-span-3 row-span-6 p-0 bg-white">
      <div className="flex flex-row justify-between px-4 pt-2">
        <h4 className="text-xl text-black/90 dark:text-white/90 mb-4">
          Notifications
        </h4>

        <h4 className="text-md text-gray-600 dark:text-white/90 mb-4">
          Mark all as read
        </h4>
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
                <Avatar name="2" size="sm" color="warning"/>
              </div>
            }
          >
            <InboxNotifications />
          </Tab>
          <Tab
            key="competitions"
            title={
              <div className="flex items-center space-x-2">
                <span>Groups</span>
                <Avatar name="5" size="sm" color="warning"/>
              </div>
            }
            className="p-0"
          >
            <CompetitionsNotifications />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
