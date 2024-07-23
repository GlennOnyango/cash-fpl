import { fetchPublicCompetitions } from "@/app/actions";
import OpenLeagues from "./components/App";
import { CompetitionTypes, CompetitionTypesProps } from "@/utils/types";
import { redirect } from "next/navigation";

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
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        Open Leagues
      </h4>
      <div className="overflow-x-auto overflow-y-hidden">
        <OpenLeagues loadedData={competitions} />
      </div>
    </div>
  );
}
