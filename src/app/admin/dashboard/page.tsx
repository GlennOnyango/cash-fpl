import LeaguesWindows from "@/app/components/windows/leagues";
import ManagerLayout from "../layout";
import LeaguesUsers from "@/app/components/windows/Users";

export default function MangerDashboard() {
  return (
    <main className="flex min-h-screen flex-row overflow-y-auto gap-10 p-4">
      <LeaguesWindows />
      <LeaguesUsers />
    </main>
  );
}

MangerDashboard.getLayout = (page: React.ReactNode) => (
  <ManagerLayout>{page}</ManagerLayout>
);
