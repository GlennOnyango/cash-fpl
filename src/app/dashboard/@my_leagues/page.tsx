import { fetchMyLeagues } from "@/app/actions";
import { redirect } from "next/navigation";
import { Content, MyLeaguesTableProps } from "@/utils/types";
import { Link } from "@nextui-org/react";
import CreateComponentModal from "@/components/createComponentModal";
import MyLeagueTable from "../../../components/tables/my-leagues/dashboard";

export default async function Leagues() {
  let leagues: MyLeaguesTableProps[] = [];
  let pageNumber = 1;
  let rowsPerPage = 5;
  const INITIAL_VISIBLE_COLUMNS = ["name", "active", "currency", "actions"];

  const leaguesFetch = await fetchMyLeagues(pageNumber - 1, rowsPerPage);

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content.map((league: Content) => {
      return {
        id: league.id,
        name: league.name,
        currency: league.currencyId === 1 ? "KES" : "USD",
        active: league.leagueStatus,
        ownerId: league.ownerId,
      };
    });
  }
  return (
    <div
      className="
    col-span-12 
    sm:col-span-4
    bg-white
    px-2
    py-6
    rounded-none
    max-h-mobileTile
    sm:max-h-upperTile
    overflow-hidden"
    >
      <div className="w-full flex flex-row mb-2 h-1/10 justify-between">
        <Link
          className="text-xl sm:text-2xl text-black/90 dark:text-white/90 mb-4 hover:underline"
          href="/leagues?page=1"
        >
          My Leagues
        </Link>

        <CreateComponentModal />
      </div>
      <div className="overflow-x-auto overflow-y-auto h-9/10">
        <MyLeagueTable
          loadedData={leagues}
          visibleColumns={INITIAL_VISIBLE_COLUMNS}
        />
      </div>
    </div>
  );
}
