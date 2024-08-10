import { getNotifications } from "@/app/actions";
import NotificationBody from "./component/notificationBody";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NotificationsType } from "@/utils/types";

export default async function Notifications() {
  let notificationsContent: NotificationsType[] = [];
  const token = cookies().get("accessToken")?.value || "";
  const notifications = await getNotifications();

  return <NotificationBody token={token} />;
}
