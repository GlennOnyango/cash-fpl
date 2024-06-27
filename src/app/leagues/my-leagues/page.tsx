import ManagerPageNavbar from "@/components/navbars/manager-nav";
import MYLeagueTable from "./components/App";

export default function page() {
  return (
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white mx-8 p-4 overflow-hidden"
        style={{
          height: "calc(100vh - 8rem)",
        }}
      >
        <h1 className="text-black text-4xl mb-4">My Leagues</h1>
        <MYLeagueTable />
      </div>
    </ManagerPageNavbar>
  );
}
