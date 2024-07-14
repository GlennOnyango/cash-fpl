import { Spinner } from "@nextui-org/react";

export default function loading() {
  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none overflow-x-auto">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        My Leagues
      </h4>
      <div className="h-full flex justify-center">
        <Spinner label="Loading..." color="warning" />
      </div>
    </div>
  );
}
