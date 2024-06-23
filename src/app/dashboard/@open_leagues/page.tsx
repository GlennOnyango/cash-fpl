import AppComplexLeague from "./components/App";

export default function Leagues() {
  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        Open Leagues
      </h4>
      <div className="overflow-x-auto overflow-y-hidden">
        <AppComplexLeague />
      </div>
    </div>
  );
}
