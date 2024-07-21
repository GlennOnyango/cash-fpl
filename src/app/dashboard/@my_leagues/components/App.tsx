"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Selection,
  ChipProps,
  SortDescriptor,
  Chip,
  Link,
} from "@nextui-org/react";
import { columns, availability } from "@/utils/tableData/myLeagueData";
import { capitalize } from "@/utils/utils";
import { MyLeaguesTableProps } from "@/utils/types";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  PAUSED: "secondary",
  CLOSED: "danger",
  SUSPENDED: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "active", "currency", "actions"];

type Props = {
  loadedData: MyLeaguesTableProps[];
};

export default function AppComplexLeague({ loadedData }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...loadedData];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== availability.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.active ? "public" : "private")
      );
    }

    return filteredUsers;
  }, [loadedData, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: MyLeaguesTableProps, b: MyLeaguesTableProps) => {
      const first = a[
        sortDescriptor.column as keyof MyLeaguesTableProps
      ] as string;
      const second = b[
        sortDescriptor.column as keyof MyLeaguesTableProps
      ] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (league: MyLeaguesTableProps, columnKey: React.Key) => {
      const cellValue = league[columnKey as keyof MyLeaguesTableProps];
      switch (columnKey) {
        case "name":
          return <p className="text-default-700">{league.name}</p>;

        case "active":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[league.active]}
              size="sm"
              variant="dot"
            >
              {league.active}
            </Chip>
          );

        case "currency":
          return (
            <p className="text-default-700">{capitalize(league.currency)}</p>
          );

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Button
                size="sm"
                variant="shadow"
                radius="full"
                color="warning"
                as={Link}
                href={`/leagues/my-leagues/${league.id}`}
              >
                Manage
              </Button>
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
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
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

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      onSelectionChange={setSelectedKeys}
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
