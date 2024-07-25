import ManagerPageNavbar from "@/components/navbars/manager-nav";
import UpdateLeagueComponent from "@/components/updateLeague";
import { fetchLeagueById } from "@/app/actions";
import { redirect } from "next/navigation";
import { CompetitionTypes, UpdateLeague } from "@/utils/types";

export default async function page({ params }: { params: { id: string } }) {
  const leaguesFetch = await fetchLeagueById(params.id);

  let leagueDetails: UpdateLeague = {
    id: "",
    ownerId: "",
    name: "",
    types: ["weekly"],
    currency: "USD",
    competitionTypes: [],
  };

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch) {
    const leagueCompetitionTypes = leaguesFetch.competitionTypes.map(
      (competition: CompetitionTypes) => {
        if (competition.competitionDuration === "WEEKLY") {
          return "WEEKLY";
        } else if (competition.competitionDuration === "MONTHLY") {
          return "MONTHLY";
        } else if (competition.competitionDuration === "SEASONAL") {
          return "SEASONAL";
        }
      }
    );

    leagueDetails = {
      id: leaguesFetch.id,
      ownerId: leaguesFetch.owner,
      name: leaguesFetch.name,
      types: leagueCompetitionTypes,
      currency: leaguesFetch.currencyId === 1 ? "KES" : "USD",
      competitionTypes: leaguesFetch.competitionTypes,
    };
  }

  return (
    <ManagerPageNavbar>
      <div className="flex justify-center items-center h-full">
        <UpdateLeagueComponent data={leagueDetails} />
      </div>
    </ManagerPageNavbar>
  );
}
