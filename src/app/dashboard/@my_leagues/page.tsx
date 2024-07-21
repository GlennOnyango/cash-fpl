import { fetchMyLeagues } from "@/app/actions";
import AppComplexLeague from "./components/App";
import { redirect } from "next/navigation";
import { Content, MyLeaguesTableProps } from "@/utils/types";
import { Link } from "@nextui-org/react";
import CreateComponentModal from "@/components/createComponentModal";

export default async function Leagues() {
  let leagues: MyLeaguesTableProps[] = [];

  const leaguesFetch = await fetchMyLeagues(0, 7);

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
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none overflow-x-auto">
      <div className="w-full flex flex-row justify-between">
        <Link
          className="text-3xl text-black/90 dark:text-white/90 mb-4 hover:underline"
          href="/leagues/my-leagues"
        >
          My Leagues
        </Link>

        <CreateComponentModal />
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <AppComplexLeague loadedData={leagues} />
      </div>
    </div>
  );
}
