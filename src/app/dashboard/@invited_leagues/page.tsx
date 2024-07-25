import InvitedLeagues from "./components/Invited";

export default function Leagues() {
  return (
    <div className="col-span-12 sm:col-span-4 bg-white p-4 py-6 min-h-fit rounded-none">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        Participating Leagues
      </h4>

      <div className="overflow-x-auto overflow-y-hidden">
        <InvitedLeagues />
      </div>
    </div>
  );
}
