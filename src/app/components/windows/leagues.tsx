"use client";

import { Flowbite, Table, Button, Tooltip } from "flowbite-react";
import customTheme from "../customTheme";

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
    name: "Sunflower oil",
    status: "Active",
    number_of_teams: 7,
    weeks_participated: 2,
    invite_link: "/leagues/sunflower-oil",
  },
  {
    id: 7,
    name: "Peanut oil",
    status: "Active",
    number_of_teams: 11,
    weeks_participated: 8,
    invite_link: "/leagues/peanut-oil",
  },
  {
    id: 8,
    name: "Sesame oil",
    status: "Inactive",
    number_of_teams: 5,
    weeks_participated: 1,
    invite_link: "/leagues/sesame-oil",
  },
  {
    id: 9,
    name: "Walnut oil",
    status: "Active",
    number_of_teams: 4,
    weeks_participated: 9,
    invite_link: "/leagues/walnut-oil",
  },
  {
    id: 10,
    name: "Grapeseed oil",
    status: "Active",
    number_of_teams: 3,
    weeks_participated: 10,
    invite_link: "/leagues/grapeseed-oil",
  },
  {
    id: 11,
    name: "Palm oil",
    status: "Active",
    number_of_teams: 2,
    weeks_participated: 11,
    invite_link: "/leagues/palm-oil",
  },
  {
    id: 12,
    name: "Canola oil",
    status: "Active",
    number_of_teams: 1,
    weeks_participated: 12,
    invite_link: "/leagues/canola-oil",
  },
  {
    id: 13,
    name: "Soybean oil",
    status: "Active",
    number_of_teams: 0,
    weeks_participated: 13,
    invite_link: "/leagues/soybean-oil",
  },
  {
    id: 14,
    name: "Corn oil",
    status: "Active",
    number_of_teams: 0,
    weeks_participated: 14,
    invite_link: "/leagues/corn-oil",
  },
];

export default function LeaguesWindows() {
  return (
    <div className="bg-white flex flex-col" >
      <Tooltip
        content="Shows all leagues you have created presently"
        animation="duration-1000"
      >
        <h1 className="text-3xl p-4 font-bold text-black dark:text-white">
          Leagues
        </h1>
      </Tooltip>

      <div className="overflow-y-auto" style={{height:"60vh"}}>
        <Flowbite theme={{ theme: customTheme }}>
          <Table striped className="bg-white">
            <Table.Head>
              <Table.HeadCell>League</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Players</Table.HeadCell>
              <Table.HeadCell>Weeks</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Leagues.map(
                ({
                  id,
                  name,
                  status,
                  number_of_teams,
                  weeks_participated,
                  invite_link,
                }) => {
                  return (
                    <Table.Row
                      key={id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {name}
                      </Table.Cell>
                      <Table.Cell>{status}</Table.Cell>
                      <Table.Cell>{number_of_teams}</Table.Cell>
                      <Table.Cell>{weeks_participated}</Table.Cell>
                      <Table.Cell>
                        <a
                          href={`${invite_link}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          invite
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        </Flowbite>
      </div>

      <div className="flex flex-row items-center justify-center gap-10 p-4">
        <Button outline gradientDuoTone="purpleToBlue">
          view all
        </Button>
        <Button outline gradientDuoTone="purpleToBlue">
          Create
        </Button>
      </div>
    </div>
  );
}