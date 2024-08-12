import { Button, Link, Spinner } from "@nextui-org/react";

export default function loading() {
  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 py-6 rounded-none">
      <div className="w-full flex flex-row mb-4 justify-between">
        <Link
          className="text-xl sm:text-3xl text-black/90 dark:text-white/90 mb-4 hover:underline"
          href="/leagues/competitions?page=1"
        >
         Public Competitions
        </Link>

        <Button
          size="sm"
          radius="full"
          className="bg-foreground text-background"
        >
          All competitions
        </Button>
      </div>
      <div className="h-full flex justify-center">
        <Spinner label="Loading..." color="warning" />
      </div>
    </div>
  );
}
