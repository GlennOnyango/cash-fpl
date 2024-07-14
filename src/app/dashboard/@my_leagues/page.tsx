import { fetchMyLeagues } from "@/app/actions";
import AppComplexLeague from "./components/App";
import { redirect } from "next/navigation";
import { MyLeaguesTableData, MyLeaguesTableProps } from "@/utils/types";


export default async function Leagues() {
  let leagues: MyLeaguesTableProps[] = [];

  const leaguesFetch = await fetchMyLeagues();

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content.map(
      (league: MyLeaguesTableData) => {
        let competitions = league.competitionTypes.map((competition) => {
          if (competition.competitionTypeId === 1) {
            return "Weekly";
          } else if (competition.competitionTypeId === 2) {
            return "Monthly";
          } else if (competition.competitionTypeId === 3) {
            return "Yearly";
          }
        });

        return {
          id: league.id,
          name: league.name,
          publiclyAvailable: league.publiclyAvailable,
          deductExcessTransfers: league.deductExcessTransfers,
          currency: league.currencyId === 1 ? "KES" : "USD",
          active: league.active,
          ownerId: league.ownerId,
          weekly: competitions.includes("Weekly"),
          monthly: competitions.includes("Monthly"),
          seasonal: competitions.includes("Yearly"),
        };
      }
    );
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
