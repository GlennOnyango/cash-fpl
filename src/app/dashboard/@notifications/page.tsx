export const dynamic = "force-dynamic";

import NotificationBody from "./component/notificationBody";
import { cookies } from "next/headers";

export default async function Notifications() {
  const token = cookies().get("accessToken")?.value || "";

  return <NotificationBody token={token} />;
}
