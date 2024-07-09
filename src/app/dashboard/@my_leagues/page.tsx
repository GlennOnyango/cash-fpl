import { fetchMyLeagues } from "@/app/actions";
import AppComplexLeague from "./components/App";
import { redirect } from "next/navigation";
import { Content } from "@/utils/types";


export default async function Leagues() {
  let leagues: Content[] = [];

  const leaguesFetch = await fetchMyLeagues();

  
  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content;
  }

  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none overflow-x-auto">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        My Leagues
      </h4>
      <div className="overflow-x-auto overflow-y-hidden">
        <AppComplexLeague loadedData={leagues} />
      </div>
    </div>
  );
}
