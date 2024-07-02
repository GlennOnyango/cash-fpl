const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "Availability", uid: "publiclyAvailable", sortable: true },
  { name: "Currency", uid: "currencyId", sortable: true },
  { name: "Payment Deadline", uid: "paymentDeadline", sortable: true },
  { name: "Active", uid: "active", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const availability = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

export { columns, availability };
