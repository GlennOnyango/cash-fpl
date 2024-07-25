import type { Metadata } from "next";
import ManagerPageNavbar from "../../components/navbars/manager-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard",
};

export default function Layout({
  children,
  notifications,
  competitions,
  my_leagues,
  invited_leagues,
  statistics,
}: Readonly<{
  children: React.ReactNode;
  notifications: React.ReactNode;
  competitions: React.ReactNode;
  my_leagues: React.ReactNode;
  invited_leagues: React.ReactNode;
  play: React.ReactNode;
  statistics: React.ReactNode;
}>) {
  return (
    <ManagerPageNavbar>
      <div className="grow grid grid-cols-1 sm:grid-cols-3 grid-rows-5 sm:grid-rows-2 gap-2 p-2 pb-6">
        {competitions}
        {my_leagues}
        {invited_leagues}
        {notifications}
        {statistics}
      </div>
    </ManagerPageNavbar>
  );
}
