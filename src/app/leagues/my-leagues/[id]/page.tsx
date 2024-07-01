import ManagerPageNavbar from "@/components/navbars/manager-nav";
import UpdateLeagueComponent from "../components";

export default function page({ params }: { params: { id: string } }) {
  return (
    <ManagerPageNavbar>
      <div>My League {params.id}</div>
      <div className="col-span-12 sm:col-span-4 row-span-6 bg-white mx-8 p-4">
        <UpdateLeagueComponent id={params.id} />
      </div>
    </ManagerPageNavbar>
  );
}
