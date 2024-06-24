type user = {
  id: number;
  name: string;
  status: string;
};

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Cancelled", uid: "cancelled" },
];

const users: user[] = [
  {
    id: 1,
    name: "Tony Reichert",
    status: "active",
  },
  {
    id: 2,
    name: "Zoey Lang",
    status: "paused",
  },
  {
    id: 3,
    name: "Jane Fisher",
    status: "active",
  },
  {
    id: 4,
    name: "William Howard",
    status: "cancelled",
  },
  {
    id: 5,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 6,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 7,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 8,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 9,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 10,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 11,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 12,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 13,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 14,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 15,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 16,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 17,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 18,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 19,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 20,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 21,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 22,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 23,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 24,
    name: "Liam Howard",
    status: "cancelled",
  },
  {
    id: 25,
    name: "Liam Howard",
    status: "cancelled",
  },
];
  

export { columns, users, statusOptions };
