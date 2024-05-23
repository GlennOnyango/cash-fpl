"use client";

import { Flowbite, Table, Button } from "flowbite-react";
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
];

export default function LeaguesUsers() {
  return (
    <div
      className="rounded-md bg-white"
      style={{ width: "60%", height: "60vh" }}
    >
      <h1 className="text-3xl p-4 text-center font-bold text-gray-900 dark:text-white">
        Users
      </h1>
      <div
        className="overflow-x-auto bg-white max-h-80"
        style={{ width: "100%" }}
      >
        <Flowbite theme={{ theme: customTheme }}>
          <Table striped>
            <Table.Head>
              <Table.HeadCell>League</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Players</Table.HeadCell>
              <Table.HeadCell>Weeks</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y overflow-hidden">
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
                          View
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
      </div>
    </div>
  );
}


