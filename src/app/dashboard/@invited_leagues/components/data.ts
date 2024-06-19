type user = {
  id: number;
  name: string;
  status: string;
  avatar: string;
  creator: string;
};

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Cancelled", uid: "cancelled" },
];

const users: user[] = [
  {
    id: 1,
    name: "FPL Invitational League",
    status: "active",
    avatar: "/resources/mini.jpg",
    creator: "Tony Reichert",
  },
  {
    id: 2,
    name: "Legacy League",
    status: "cancelled",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    creator: "Zoey Lang",
  },
  {
    id: 3,
    name: "FPL Invitational League",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    creator: "Jane Fisher",
  },
  {
    id: 4,
    name: "Legacy League",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    creator: "William Howard",
  },
  {
    id: 5,
    name: "FPL Invitational League",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    creator: "Kristen Copper",
  },
  {
    id: 6,
    name: "Legacy League",
    status: "cancelled",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    creator: "Brian Kim",
  },
  {
    id: 7,
    name: "FPL Invitational League",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    creator: "Michael Hunt",
  },
];

export { columns, users, statusOptions };
