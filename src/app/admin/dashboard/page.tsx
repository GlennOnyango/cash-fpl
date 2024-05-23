import LeaguesWindows from "@/app/components/windows/leagues";
import ManagerLayout from "../layout";

export default function MangerDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LeaguesWindows />
    </main>
  );
}

MangerDashboard.getLayout = (page: React.ReactNode) => (
  <ManagerLayout>{page}</ManagerLayout>
);
