import { fetchPublicCompetitions } from "@/app/actions";
import { CompetitionTypesProps } from "@/utils/types";
import { redirect } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import CompetitionsTable from "@/components/tables/competitions/dashboard";

export default async function Leagues() {
  let competitions: CompetitionTypesProps[] = [];
  let pageNumber = 1;
  let rowsPerPage = 7;

  const INITIAL_VISIBLE_COLUMNS = [
    "leagueName",
    "competitionDuration",
    "currency",
    "actions",
  ];

  const publicCompetitions = await fetchPublicCompetitions(
    pageNumber - 1,
    rowsPerPage
  );

  if (publicCompetitions?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (publicCompetitions?.content) {
    competitions = publicCompetitions.content;
  }

  return (
    <div className="col-span-12 sm:col-span-6 row-span-6 bg-white p-4 py-6 rounded-none">
      <div className="w-full flex flex-row mb-4 justify-between">
        <Link
          className="text-xl sm:text-3xl text-black/90 dark:text-white/90 mb-4 hover:underline"
          href="/leagues/competitions?page=1"
        >
          Public Competitions
        </Link>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <CompetitionsTable
          loadedData={competitions}
          visibleColumns={INITIAL_VISIBLE_COLUMNS}
        />
      </div>
    </div>
  );
}
