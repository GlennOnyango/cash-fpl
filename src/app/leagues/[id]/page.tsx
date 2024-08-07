import ManagerPageNavbar from "@/components/navbars/manager-nav";
import UpdateLeagueComponent from "@/components/updateLeague";
import { fetchLeagueById } from "@/app/actions";
import { redirect } from "next/navigation";
import { CompetitionTypes, UpdateLeague } from "@/utils/types";

export default async function page({ params }: { params: { id: string } }) {
  const leaguesFetch = await fetchLeagueById(params.id);

  let leagueDetails: UpdateLeague = {
    createdBy: "",
    createdAt: "",
    lastModifiedBy: "",
    lastModifiedAt: "",
    types: [],
    id: "",
    ownerId: "",
    name: "",
    leagueStatus: "",
    currencyId: 1,
    newPlayerJoinsAll: true,

    competitionTypes: [],
  };

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch) {
    leagueDetails = {
      ...leaguesFetch,

      types: leaguesFetch.competitionTypes.map(
        (competition: CompetitionTypes) => competition.competitionDuration
      ),
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
