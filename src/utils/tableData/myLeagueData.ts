const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "Availability", uid: "publiclyAvailable", sortable: true },
    { name: "Weekly", uid: "weekly", sortable: true },
    { name: "Monthly", uid: "monthly", sortable: true },
    { name: "Seasonal", uid: "seasonal", sortable: true },
    { name: "Currency", uid: "currencyId", sortable: true },
    { name: "Transfer penalties", uid: "deductExcessTransfers" },
    { name: "Active", uid: "active", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const availability = [
    { name: "Public", uid: "public" },
    { name: "Private", uid: "private" },
  ];
  
  export { columns, availability };
  