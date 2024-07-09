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
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
  Chip,
  Link,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { columns, availability } from "@/utils/tableData/myLeagueData";
import { capitalize } from "@/utils/utils";
import CreateLeagueModal from "@/components/modals/create-league";
import { MyLeaguesTableProps } from "@/utils/types";

const statusColorMap: Record<string, ChipProps["color"]> = {
  public: "success",
  private: "warning",
};

const statusColorMapCompetitions: Record<string, ChipProps["color"]> = {
  active: "success",
  disabled: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "publiclyAvailable",
  "active",
  "deductExcessTransfers",
  "weekly",
  "monthly",
  "seasonal",
  "actions",
];

type Props = {
  loadedData: MyLeaguesTableProps[];
};

export default function MYLeagueTable({ loadedData }: Props) {
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

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  useEffect(() => {
    console.log(loadedData);
  }, []);

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
        Array.from(statusFilter).includes(
          user.publiclyAvailable ? "public" : "private"
        )
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
      ] as boolean;
      const second = b[
        sortDescriptor.column as keyof MyLeaguesTableProps
      ] as boolean;
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
        case "publiclyAvailable":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={
                statusColorMap[league.publiclyAvailable ? "public" : "private"]
              }
              size="sm"
              variant="dot"
            >
              {capitalize(league.publiclyAvailable ? "public" : "private")}
            </Chip>
          );
        case "weekly":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={
                statusColorMapCompetitions[
                  league.weekly ? "active" : "disabled"
                ]
              }
              size="sm"
              variant="dot"
            >
              {league.weekly ? "active" : "not available"}
            </Chip>
          );
        case "monthly":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={
                statusColorMapCompetitions[
                  league.monthly ? "active" : "disabled"
                ]
              }
              size="sm"
              variant="dot"
            >
              {league.monthly ? "active" : "not available"}
            </Chip>
          );
        case "seasonal":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600 justify-start"
              color={
                statusColorMapCompetitions[
                  league.seasonal ? "active" : "disabled"
                ]
              }
              size="sm"
              variant="dot"
            >
              {league.seasonal ? "active" : "not available"}
            </Chip>
          );
        case "deductExcessTransfers":
          return (
            <p
              className={`${
                league.active ? "text-green-700" : "text-amber-700"
              }`}
            >
              {capitalize(league.active ? "active" : "cancelled")}
            </p>
          );

        case "active":
          return (
            <p
              className={`${
                league.active ? "text-green-700" : "text-amber-700"
              }`}
            >
              {capitalize(league.active ? "active" : "cancelled")}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-2">
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
              base: "w-full sm:max-w-[35%]",
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
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                  className="bg-foreground text-background"
                >
                  Availability
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {availability.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize text-default-900"
                  >
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              onPress={onOpen}
              endContent={<PlusIcon />}
              size="sm"
            >
              Add New League
            </Button>
          </div>
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
        isStriped
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
    </>
  );
}
