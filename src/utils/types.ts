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

export type OpenLeaguesTableProps = {
  id: string;
  name: string;
  weekly: boolean;
  monthly: boolean;
  seasonal: boolean;
  currency: string;
};
export type MyLeaguesTableData = {
  id: string;
  name: string;
  publiclyAvailable: boolean;
  deductExcessTransfers: boolean;
  currencyId: number;
  active: boolean;
  ownerId: string;
  competitionTypes: CompetitionTypes[];
  leaguePenalties: LeaguePenalties[];
};

export type MyLeaguesTableProps = {
  id: string;
  name: string;
  publiclyAvailable: boolean;
  deductExcessTransfers: boolean;
  currency: string;
  active: boolean;
  ownerId: string;
  weekly: boolean;
  monthly: boolean;
  seasonal: boolean;
};
