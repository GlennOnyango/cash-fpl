import ManagerPageNavbar from "@/components/navbars/manager-nav";
import OpenLeaguesTable from "./components/App";

export default function Page() {
  return (
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none mx-8 overflow-hidden"
        style={{
          height: "calc(100vh - 8rem)",
        }}
      >
        <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
          Open Leagues
        </h4>
        <OpenLeaguesTable />
      </div>
    </ManagerPageNavbar>
  );
}
