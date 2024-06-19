type user = {
  id: number;
  name: string;
  status: string;
  avatar: string;
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
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    status: "cancelled",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    name: "William Howard",
    status: "vacation",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 5,
    name: "Kristen Copper",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 6,
    name: "Brian Kim",
    status: "cancelled",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 7,
    name: "Michael Hunt",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
  },
  {
    id: 9,
    name: "Frank Harrison",
    status: "vacation",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 10,
    name: "Emma Adams",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 12,
    name: "Megan Richards",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 13,
    name: "Oliver Scott",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 14,
    name: "Grace Allen",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 15,
    name: "Noah Carter",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 16,
    name: "Ava Perez",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 17,
    name: "Liam Johnson",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=29",
  },
  {
    id: 19,
    name: "Lucas Harris",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?img=50",
  },
  {
    id: 20,
    name: "Mia Robinson",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export { columns, users, statusOptions };
