type User = {
  id: number;
  name: string;
  weeklyCompetition:boolean;
  monthlyCompetition:boolean;
  seasonalCompetition:boolean;
  currency: "USD" | "KES";
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "League Name", uid: "name", sortable: true },
  { name: "Weekly Competition", uid: "weeklyCompetition", sortable: true },
  { name: "Monthly Competition", uid: "monthlyCompetition", sortable: true },
  { name: "Seasonal Competition", uid: "seasonalCompetition", sortable: true },
  { name: "Currency", uid: "currency", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const currencyOptions = [
  { name: "USD", uid: "USD" },
  { name: "KES", uid: "KES" },
];

const users: User[] = [
  {
    id: 1,
    name: "League 1",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 2,
    name: "League 2",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 3,
    name: "League 3",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 4,
    name: "League 4",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 5,
    name: "League 5",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 6,
    name: "League 6",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 7,
    name: "League 7",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 8,
    name: "League 8",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 9,
    name: "League 9",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 10,
    name: "League 10",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 11,
    name: "League 11",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 12,
    name: "League 12",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 13,
    name: "League 13",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 14,
    name: "League 14",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 15,
    name: "League 15",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 16,
    name: "League 16",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 17,
    name: "League 17",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 18,
    name: "League 18",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },
  {
    id: 19,
    name: "League 19",
    weeklyCompetition: true,
    monthlyCompetition: false,
    seasonalCompetition: true,
    currency: "USD",
  },
  {
    id: 20,
    name: "League 20",
    weeklyCompetition: false,
    monthlyCompetition: true,
    seasonalCompetition: false,
    currency: "KES",
  },

];

export { columns, users, currencyOptions };
