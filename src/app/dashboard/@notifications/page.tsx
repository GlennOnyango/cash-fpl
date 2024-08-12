export const dynamic = 'force-dynamic';

import NotificationWindow from "@/components/notfications/NotificationWindow";
import NotificationBody from "./component/notificationBody";
import { cookies } from "next/headers";

export default async function Notifications({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const token = cookies().get("accessToken")?.value || "";

  console.log("params", searchParams);

  if (searchParams.notification_id) {
    return (
      <NotificationWindow
        id={searchParams.notification_id}
        page={Number(searchParams.page)}
      />
    );
  }

  return <NotificationBody token={token} />;
}
