import { fetchPublicCompetitions } from "@/app/actions";
import OpenLeagues from "./components/App";
import { CompetitionTypes, CompetitionTypesProps } from "@/utils/types";
import { redirect } from "next/navigation";
import { Button, Link } from "@nextui-org/react";

export default async function Leagues() {
  let competitions: CompetitionTypesProps[] = [];

  const publicCompetitions = await fetchPublicCompetitions(0, 7);

  if (publicCompetitions?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (publicCompetitions?.content) {
    competitions = publicCompetitions.content;
  }

  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none">
      <div className="w-full flex flex-row justify-between">
        <Link
          className="text-3xl text-black/90 dark:text-white/90 mb-4 hover:underline"
          href="/leagues/my-leagues?page=1"
        >
          Competitions
        </Link>

        <Button
          size="md"
          radius="full"
          className="bg-foreground text-background"
        >
          See all competitions
        </Button>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <OpenLeagues loadedData={competitions} />
      </div>
    </div>
  );
}
