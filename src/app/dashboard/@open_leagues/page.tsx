import { fetchOpenLeagues } from "@/app/actions";
import OpenLeagues from "./components/App";

export type LeaguePenalties = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  penaltyType: string;
  value: number;
  leagueId: string;
};

export type CompetitionTypes = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  competitionTypeId: number;
  amount: number;
  leagueId: string;
};

export type Content = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  name: string;
  publiclyAvailable: boolean;
  currencyId: number;
  paymentDeadline: string;
  active: boolean;
  ownerId: string;
  competitionTypes: CompetitionTypes[];
  leaguePenalties: LeaguePenalties[];
};

export default async function Leagues() {

  let leagues: Content[] = [];

  const leaguesFetch = await fetchOpenLeagues();

  if (leaguesFetch?.content) {
    leagues = leaguesFetch.content;
  }

  return (
    <div className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none">
      <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
        Open Leagues
      </h4>
      <div className="overflow-x-auto overflow-y-hidden">
        <OpenLeagues loadedData={leagues} />
      </div>
    </div>
  );
}
