import ManagerPageNavbar from "@/components/navbars/manager-nav";
import MYLeagueTable from "./components/App";
import { MyLeaguesTableData, MyLeaguesTableProps } from "@/utils/types";
import { fetchMyLeagues } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function page() {
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
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white mx-20 p-4 overflow-hidden"
        style={{
          height: "calc(100vh - 8rem)",
        }}
      >
        <h1 className="text-black text-4xl mb-4">My Leagues</h1>
        <MYLeagueTable loadedData={leagues} />
      </div>
    </ManagerPageNavbar>
  );
}
