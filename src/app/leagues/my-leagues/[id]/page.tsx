import ManagerPageNavbar from "@/components/navbars/manager-nav";
import UpdateLeagueComponent from "../components";
import { fetchLeagueById } from "@/app/actions";
import { redirect } from "next/navigation";
import { UpdateLeague } from "@/utils/types";

export default async function page({ params }: { params: { id: string } }) {
  const leaguesFetch = await fetchLeagueById(params.id);
  let leagueDetails: UpdateLeague = {
    id: "",
    ownerId: "",
    name: "",
    types: ["weekly"],
    currency: "USD",
    weekly: {
      amount: "0",
      access: ["public"],
      penalty: ["True"],
    },
    monthly: null,
    seasonal: null,
  };

  if (leaguesFetch?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (leaguesFetch) {
    console.log(leaguesFetch);
    leagueDetails = {
      id: leaguesFetch.id,
      ownerId: leaguesFetch.owner,
      name: leaguesFetch.name,
      types: ["weekly", "monthly", "seasonal"],
      currency: leaguesFetch.currencyId === 1 ? "KES" : "USD",
      weekly: {
        amount: "100",
        access: ["public"],
        penalty: ["True"],
      },
      monthly: {
        amount: "200",
        access: ["private"],
        penalty: ["True"],
      },
      seasonal: {
        amount: "",
        access: ["public"],
        penalty: ["True"],
      },
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
