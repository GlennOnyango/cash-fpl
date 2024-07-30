"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ChipProps,
  SortDescriptor,
  Chip,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { columns } from "@/utils/tableData/myLeagueData";
import { capitalize } from "@/utils/utils";
import { MyLeaguesTableProps } from "@/utils/types";
import {
  PaperAirplaneIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  PAUSED: "secondary",
  CLOSED: "danger",
  SUSPENDED: "warning",
};

type Props = {
  loadedData: MyLeaguesTableProps[];
  visibleColumns: string[];
};

export default function MyLeagueTable({ loadedData, visibleColumns }: Props) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const sortedItems = React.useMemo(() => {
    return [...loadedData].sort(
      (a: MyLeaguesTableProps, b: MyLeaguesTableProps) => {
        const first = a[
          sortDescriptor.column as keyof MyLeaguesTableProps
        ] as string;
        const second = b[
          sortDescriptor.column as keyof MyLeaguesTableProps
        ] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, loadedData]);

  const renderCell = React.useCallback(
    (league: MyLeaguesTableProps, columnKey: React.Key) => {
      const cellValue = league[columnKey as keyof MyLeaguesTableProps];
      switch (columnKey) {
        case "name":
          return <p className="text-default-700 text-center">{league.name}</p>;

        case "active":
          return (
            <div className="flex justify-center items-center">
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[league.active]}
                size="sm"
                variant="dot"
              >
                {league.active}
              </Chip>
            </div>
          );

        case "currency":
          return (
            <p className="text-default-700 text-center">
              {capitalize(league.currency)}
            </p>
          );

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Tooltip
                content="Edit League"
                placement="top"
                className="bg-warning text-black"
              >
                <Button
                  size="md"
                  variant="light"
                  isIconOnly
                  color="warning"
                  as={Link}
                  className="p-2"
                  href={`/leagues/my-leagues/${league.id}`}
                >
                  <PencilSquareIcon className="text-black" />
                </Button>
              </Tooltip>

              <Tooltip
                content="Send Invites"
                placement="top"
                className="bg-warning text-black"
              >
                <Button
                  size="md"
                  variant="light"
                  color="warning"
                  isIconOnly
                  as={Link}
                  className="p-2 "
                  href={`/leagues/my-leagues/${league.id}`}
                >
                  <PaperAirplaneIcon className="text-black" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return league.name;
      }
    },
    []
  );

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: [
        "bg-transparent",
        "text-default-500",
        "border-b",
        "border-divider",
        "text-center",
      ],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  const isEven = (id: string) => {
    let index = loadedData.findIndex((item) => item.id === id);

    return index % 2 === 0;
  };

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Create your league"} items={sortedItems}>
        {(item) => (
          <TableRow
            key={item.id}
            className={`${isEven(item.id) ? "bg-slate-100" : "bg-white"} `}
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
