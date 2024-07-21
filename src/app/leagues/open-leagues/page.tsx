import ManagerPageNavbar from "@/components/navbars/manager-nav";
import OpenLeaguesTable from "./components/App";
import { Content, OpenLeaguesTableProps } from "@/utils/types";
import { fetchOpenLeagues } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  let leagues: Content[] = [];

  const leaguesFetch = await fetchOpenLeagues();

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content;
  }

  const openLeagueData: OpenLeaguesTableProps[] = leagues.map((league) => {
    let competitions = league.competitionTypes.map((competition) => {
      if (competition.competitionDuration === "WEEKLY") {
        return "Weekly";
      } else if (competition.competitionDuration === "MONTHLY") {
        return "Monthly";
      } else if (competition.competitionDuration === "SEASONAL") {
        return "Yearly";
      }
    });

    return {
      id: league.id,
      name: league.name,
      weekly: competitions.includes("Weekly"),
      monthly: competitions.includes("Monthly"),
      seasonal: competitions.includes("Yearly"),
      currency: league.currencyId === 1 ? "KES" : "USD",
    };
  });

  return (
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none mt-4 mx-20 overflow-hidden"
        style={{
          height: "calc(100vh - 200px)",
        }}
      >
        <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
          Open Leagues
        </h4>
        <OpenLeaguesTable loadedData={openLeagueData} />
      </div>
    </ManagerPageNavbar>
  );
}
