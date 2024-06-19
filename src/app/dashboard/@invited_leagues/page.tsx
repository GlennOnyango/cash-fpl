import InvitedLeagues from "./components/Invited";

export default function Leagues() {
  return (
    <div className="col-span-4 row-span-6 bg-white p-4 rounded-md">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        Participating Leagues
      </h4>

      <InvitedLeagues />
    </div>
  );
}
