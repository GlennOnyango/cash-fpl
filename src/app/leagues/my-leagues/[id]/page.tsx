import ManagerPageNavbar from "@/components/navbars/manager-nav";
import UpdateLeagueComponent from "../components";
import { fetchLeagueById } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const leaguesFetch = await fetchLeagueById(params.id);

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch) {
    console.log(leaguesFetch);
    let leagueDetails = {
      owner: leaguesFetch.owner,
      name: leaguesFetch.name,
    };
  }

  return (
    <ManagerPageNavbar>
      <div>My League {params.id}</div>
      <div className="col-span-12 sm:col-span-4 row-span-6 bg-white mx-8 p-4">
        <UpdateLeagueComponent id={params.id} />
      </div>
    </ManagerPageNavbar>
  );
}
