export type LeaguePenalties = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  penaltyType: string;
  value: number;
  leagueId: string;
};

export type currency = {
  currency: string;
  minWeekly: number;
  minMonthly: number;
  minSeasonal: number;
};

export type CompetitionTypes = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  competitionDuration: "WEEKLY" | "MONTHLY" | "SEASONAL";
  isPublic: boolean;
  enableExcessTransferPenalty: boolean;
  amount: number;
  leagueId: string;
};

export type CompetitionTypesProps = {
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  competitionDuration: "WEEKLY" | "MONTHLY" | "SEASONAL";
  isPublic: boolean;
  enableExcessTransferPenalty: boolean;
  amount: number;
  leagueId: string;
  leagueName: string;
  currencyId: number;
};

export type Content = {
  createdBy: string;
  createdAt: string;
  lastModifiedAt: string;
  id: string;
  name: string;
  leagueStatus: string;
  currencyId: number;
  ownerId: string;
  newPlayerJoinsAll: boolean;
  competitionTypes: CompetitionTypes[];
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
  currencyId: number;
  active: string;
  ownerId: string;
  competitionTypes: CompetitionTypes[];
};

export type MyLeaguesTableProps = {
  id: string;
  name: string;
  currency: string;
  active: string;
  ownerId: string;
  weekly: boolean;
  monthly: boolean;
  seasonal: boolean;
};

export type Competiton = {
  amount: string;
  access: string[];
  penalty: string[];
};

export type UpdateLeague = {
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  id: string;
  types: string[];
  ownerId: string;
  name: string;
  leagueStatus: string;
  currencyId: number;
  newPlayerJoinsAll: boolean;
  competitionTypes: CompetitionTypes[];
};

export type NotificationsType = {
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  id: string;
  title: string;
  message: string;
  receiverId: string;
  category: string;
  read: boolean;
  dateRead: any;
};
