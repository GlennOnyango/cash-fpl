import type { Metadata } from "next";
import ManagerPageNavbar from "../../components/navbars/manager-nav";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard",
};

export default function Layout({
  children,
  players,
  notifications,
  leagues,
  play,
  statistics,
}: Readonly<{
  children: React.ReactNode;
  players: React.ReactNode;
  notifications: React.ReactNode;
  leagues: React.ReactNode;
  play: React.ReactNode;
  statistics: React.ReactNode;
}>) {
  return (
    <ManagerPageNavbar>
      <div className="grow grid grid-cols-12 grid-rows-12 gap-2 px-6 py-0">
          {leagues}
          {players}
          {notifications}
          {statistics}
          {play}
      </div>
    </ManagerPageNavbar>
  );
}
