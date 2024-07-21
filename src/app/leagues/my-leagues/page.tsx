import ManagerPageNavbar from "@/components/navbars/manager-nav";
import MyLeagueTable from "./components/App";
import { Content, MyLeaguesTableProps } from "@/utils/types";
import { fetchMyLeagues } from "@/app/actions";
import { redirect } from "next/navigation";
import CreateComponentModal from "@/components/createComponentModal";

export default async function page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let leagues: MyLeaguesTableProps[] = [];
  let totalPages = 1;
  let pageNumber = Number(searchParams.page);
  let rowsPerPage = 10;

  const leaguesFetch = await fetchMyLeagues(pageNumber - 1, rowsPerPage);

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content.map((league: Content) => {
      let competitions = league.competitionTypes.map((competition) => {
        if (competition.competitionDuration === "WEEKLY") {
          return "Weekly";
        } else if (competition.competitionDuration === "MONTHLY") {
          return "Monthly";
        } else if (competition.competitionDuration === "SEASONAL") {
          return "Seasonal";
        }
      });

      return {
        id: league.id,
        name: league.name,
        currency: league.currencyId === 1 ? "KES" : "USD",
        active: league.leagueStatus,
        ownerId: league.ownerId,
        weekly: competitions.includes("Weekly"),
        monthly: competitions.includes("Monthly"),
        seasonal: competitions.includes("Seasonal"),
      };
    });
  }

  totalPages = leaguesFetch.totalPages;

  return (
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white mx-20 p-4 mt-4 overflow-hidden"
        style={{
          height: "calc(100vh - 200px)",
        }}
      >
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-black text-4xl mb-4">My Leagues</h1>

          <CreateComponentModal />
        </div>
        <MyLeagueTable
          loadedData={leagues}
          totalPages={totalPages}
          pageNumber={pageNumber}
          // rowsPerPage={rowsPerPage}
        />
      </div>
    </ManagerPageNavbar>
  );
}
