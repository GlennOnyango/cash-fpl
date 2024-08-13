import Link from "next/link";
import InvitedLeagues from "./components/Invited";

export default function Leagues() {
  return (
    <div
      className="
  col-span-12
   sm:col-span-4
   bg-white
   px-2
   py-6
   max-h-mobileTile
   sm:max-h-upperTile
   overflow-hidden 
  rounded-none"
    >
      <div className="w-full flex flex-row mb-2 h-1/10 justify-between ">
        <Link
          className="text-xl sm:text-2xl text-black/90 dark:text-white/90 hover:underline"
          href="/leagues/competitions?page=1"
        >
          Participating Competitions
        </Link>
      </div>

      <div className="overflow-x-auto overflow-y-auto h-9/10">
        <InvitedLeagues />
      </div>
    </div>
  );
}
