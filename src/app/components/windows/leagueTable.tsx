"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  User,
  Chip,
  ChipProps,
  Button,
  Link,
} from "@nextui-org/react";

type League = {
  id: number;
  league: string;
  avatar: string;
  status: string;
  teams: number;
  weeks: number;
  actions?: string;
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  {
    key: "league",
    label: "League",
  },
  {
    key: "teams",
    label: "Teams",
  },
  {
    key: "weeks",
    label: "Weeks",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Manage",
  },
];

const Leagues: League[] = [
  {
    id: 1,
    league: "Castor oil",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    status: "Active",
    teams: 10,
    weeks: 5,
    actions: "/leagues/castor-oil",
  },
  {
    id: 2,
    league: "Olive oil",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    status: "Active",
    teams: 10,
    weeks: 5,
  },
];

export default function App() {
  const renderCell = React.useCallback(
    (league: League, columnKey: React.Key) => {
      const cellValue = league[columnKey as keyof League];

      switch (columnKey) {
        case "name":
          return <h4 className="text-bold text-lg capitalize">{cellValue}</h4>;
        case "teams":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "weeks":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );

        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[league.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            league.actions && (
              <Button
                href="https://github.com/nextui-org/nextui"
                as={Link}
                color="primary"
                variant="bordered"
              >
                Manage
              </Button>
            )
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table radius="none" isStriped aria-label="Leagues table">
      <TableHeader columns={columns}>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={Leagues}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
