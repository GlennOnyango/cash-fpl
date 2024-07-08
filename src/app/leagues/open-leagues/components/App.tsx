"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { columns, availability } from "./data";
import CreateLeagueModal from "@/components/modals/create-league";
import { OpenLeaguesTableProps } from "@/utils/types";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  disabled: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "weekly",
  "monthly",
  "seasonal",
  "currency",
  "actions",
];

type Props = {
  loadedData: OpenLeaguesTableProps[];
};

export default function OpenLeagues({ loadedData }: Props) {
  // Modal create league
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const pages = Math.ceil(loadedData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    console.log("loadedData", loadedData);
  }, [loadedData]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...loadedData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== availability.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.weekly ? "public" : "private")
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
    return [...items].sort(
      (a: OpenLeaguesTableProps, b: OpenLeaguesTableProps) => {
        const first = a[
          sortDescriptor.column as keyof OpenLeaguesTableProps
        ] as boolean;
        const second = b[
          sortDescriptor.column as keyof OpenLeaguesTableProps
        ] as boolean;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: OpenLeaguesTableProps, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof OpenLeaguesTableProps];

      switch (columnKey) {
        case "name":
          return <p className="text-default-700">{user.name}</p>;
        case "weekly":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[user.weekly ? "active" : "disabled"]}
              size="sm"
              variant="dot"
            >
              {user.weekly ? "active" : "not available"}
            </Chip>
          );
        case "monthly":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[user.monthly ? "active" : "disabled"]}
              size="sm"
              variant="dot"
            >
              {user.monthly ? "active" : "not available"}
            </Chip>
          );
          
        case "seasonal":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600 justify-start"
              color={statusColorMap[user.seasonal ? "active" : "disabled"]}
              size="sm"
              variant="dot"
            >
              {user.seasonal ? "active" : "not available"}
            </Chip>
          );
        case "currency":
          return <p className="text-default-700 justify-center">{user.currency}</p>;

        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-2">
              {/* <Button size="sm">Manage</Button> */}
              <Chip color="warning" variant="shadow">
                Join
              </Chip>
            </div>
          );
        default:
          return user.name;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-4/12 ",
              inputWrapper: "border-1",
              input: [
                "bg-transparent",
                "border-none",
                "focus:ring-0",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300 " />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    loadedData.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
    <>
      <CreateLeagueModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
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
        <TableBody emptyContent={"Open leagues not found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
