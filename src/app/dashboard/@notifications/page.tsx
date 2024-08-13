export const dynamic = "force-dynamic";

import NotificationBody from "./component/notificationBody";
import { cookies } from "next/headers";

export default async function Notifications() {
  const token = cookies().get("accessToken")?.value || "";

  return (
    <div className="col-span-12 sm:col-span-4 row-span-1 sm:row-span-3 bg-white overflow-y-hidden max-h-96 grid grid-rows-10">
      <NotificationBody token={token} />
    </div>
  );
}
