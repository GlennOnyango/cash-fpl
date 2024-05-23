const Leagues = [
  {
    id: 1,
    name: "Castor oil",
    status: "Active",
    number_of_teams: 10,
    weeks_participated: 5,
    invite_link: "/leagues/castor-oil",
  },
  {
    id: 2,
    name: "Olive oil",
    status: "Active",
    number_of_teams: 8,
    weeks_participated: 3,
    invite_link: "/leagues/olive-oil",
  },
  {
    id: 3,
    name: "Coconut oil",
    status: "Inactive",
    number_of_teams: 12,
    weeks_participated: 7,
    invite_link: "/leagues/coconut-oil",
  },
  {
    id: 4,
    name: "Argan oil",
    status: "Active",
    number_of_teams: 6,
    weeks_participated: 4,
    invite_link: "/leagues/argan-oil",
  },
  {
    id: 5,
    name: "Avocado oil",
    status: "Active",
    number_of_teams: 9,
    weeks_participated: 6,
    invite_link: "/leagues/avocado-oil",
  },
  {
    id: 6,
    name: "Grapeseed oil",
    status: "Inactive",
    number_of_teams: 11,
    weeks_participated: 8,
    invite_link: "/leagues/grapeseed-oil",
  },
  {
    id: 7,
    name: "Jojoba oil",
    status: "Active",
    number_of_teams: 7,
    weeks_participated: 5,
    invite_link: "/leagues/jojoba-oil",
  },
  {
    id: 8,
    name: "Almond oil",
    status: "Active",
    number_of_teams: 10,
    weeks_participated: 7,
    invite_link: "/leagues/almond-oil",
  },
  {
    id: 9,
    name: "Sunflower oil",
    status: "Inactive",
    number_of_teams: 8,
    weeks_participated: 6,
    invite_link: "/leagues/sunflower-oil",
  },
  {
    id: 10,
    name: "Tea tree oil",
    status: "Active",
    number_of_teams: 12,
    weeks_participated: 9,
    invite_link: "/leagues/tea-tree-oil",
  },
  {
    id: 11,
    name: "Rosehip oil",
    status: "Active",
    number_of_teams: 6,
    weeks_participated: 5,
    invite_link: "/leagues/rosehip-oil",
  },
  {
    id: 12,
    name: "Sesame oil",
    status: "Inactive",
    number_of_teams: 9,
    weeks_participated: 7,
    invite_link: "/leagues/sesame-oil",
  },
  {
    id: 13,
    name: "Peppermint oil",
    status: "Active",
    number_of_teams: 11,
    weeks_participated: 8,
    invite_link: "/leagues/peppermint-oil",
  },
  {
    id: 14,
    name: "Lavender oil",
    status: "Active",
    number_of_teams: 7,
    weeks_participated: 6,
    invite_link: "/leagues/lavender-oil",
  },
  {
    id: 15,
    name: "Eucalyptus oil",
    status: "Inactive",
    number_of_teams: 10,
    weeks_participated: 7,
    invite_link: "/leagues/eucalyptus-oil",
  },
  {
    id: 16,
    name: "Lemon oil",
    status: "Active",
    number_of_teams: 8,
    weeks_participated: 6,
    invite_link: "/leagues/lemon-oil",
  },
  {
    id: 17,
    name: "Peppermint oil",
    status: "Active",
    number_of_teams: 12,
    weeks_participated: 9,
    invite_link: "/leagues/peppermint-oil",
  },
  {
    id: 18,
    name: "Lemongrass oil",
    status: "Active",
    number_of_teams: 6,
    weeks_participated: 5,
    invite_link: "/leagues/lemongrass-oil",
  },
  {
    id: 19,
    name: "Cedarwood oil",
    status: "Inactive",
    number_of_teams: 9,
    weeks_participated: 7,
    invite_link: "/leagues/cedarwood-oil",
  },
];

export default function LeaguesWindows() {
  return (
    <div
      className="flex flex-col bg-gray-800 p-6 rounded-lg overflow-hidden"
      style={{
        maxHeight: "40vh",
        width: "50%",
      }}
    >
      <table className="table-auto  max-h-96 overflow-scroll">
        <thead>
          <tr className="border-double border-b border-slate-300">
            <th className="">Name</th>
            <th className="">players</th>
            <th className="">status</th>
            <th className="">Active weeks</th>
            <th className="">Join</th>
          </tr>
        </thead>
        <tbody className="overflow-hidden max-h-96 mt-2">
          {Leagues.map((league) => {
            return (
              <tr key={league.id}>
                <td className="text-white ">{league.name}</td>
                <td className="text-white text-center">
                  {league.number_of_teams}
                </td>
                <td className="text-white text-center">{league.status}</td>
                <td className="text-white text-center">
                  {league.weeks_participated}
                </td>
                <td className="text-white text-center">
                  <a href={league.invite_link}>Join</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
