import type { Metadata } from "next";
import ManagerPageNavbar from "../../components/navbars/manager-nav";

export const metadata: Metadata = {
  title: "Competitions",
  description: "All competitions",
};

export default function Layout({
  children,
  my_competitions,
  public_competitions,
  participating_competitions,
}: Readonly<{
  children: React.ReactNode;
  my_competitions: React.ReactNode;
  public_competitions: React.ReactNode;
  participating_competitions: React.ReactNode;
}>) {
  return (
    <ManagerPageNavbar>
      <div className="grow grid grid-cols-12 grid-rows-12 gap-2 p-6 pb-6">
        {public_competitions}
        {participating_competitions}
        {my_competitions}
      </div>
    </ManagerPageNavbar>
  );
}
