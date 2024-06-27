type User = {
  id: number;
  name: string;
  status: "active" | "paused" | "cancelled";
  access: "public" | "private";
  currency: "USD" | "KES";
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "League Name", uid: "name", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Access", uid: "access", sortable: true },
  { name: "Currency", uid: "currency", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Cancelled", uid: "cancelled" },
];

const users: User[] = [
  {
    id: 1,
    name: "League 1",
    status: "active",
    access: "public",
    currency: "USD",
  },
  {
    id: 2,
    name: "League 2",
    status: "paused",
    access: "private",
    currency: "KES",
  },
  {
    id: 3,
    name: "League 3",
    status: "cancelled",
    access: "public",
    currency: "USD",
  },
  {
    id: 4,
    name: "League 4",
    status: "active",
    access: "private",
    currency: "KES",
  },
  {
    id: 5,
    name: "League 5",
    status: "paused",
    access: "public",
    currency: "USD",
  },
  {
    id: 6,
    name: "League 6",
    status: "cancelled",
    access: "private",
    currency: "KES",
  },
];

export { columns, users, statusOptions };
