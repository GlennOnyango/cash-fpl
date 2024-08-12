import { Spinner } from "@nextui-org/react";

export default async function Loading() {
  return (
    <div className="col-span-12 sm:col-span-3 row-span-6 p-0 bg-white">
      <div className="flex flex-row justify-between px-1 pt-2">
        <h4 className="text-xl text-black/90 dark:text-white/90 mb-4">
          Notifications 2
        </h4>
      </div>

      <div className="flex w-full flex-col">
        <Spinner label="Loading..." color="warning" />
      </div>
    </div>
  );
}
