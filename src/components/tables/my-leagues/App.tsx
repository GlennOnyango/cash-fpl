"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Chip,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { columns } from "@/utils/tableData/myLeagueData";
import { MyLeaguesTableProps } from "@/utils/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PaperAirplaneIcon, PencilSquareIcon } from "@heroicons/react/16/solid";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  PAUSED: "secondary",
  CLOSED: "danger",
  SUSPENDED: "warning",
};

const statusColorMapCompetitions: Record<string, ChipProps["color"]> = {
  active: "success",
  disabled: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "active",
  "weekly",
  "monthly",
  "seasonal",
  "actions",
];

type Props = {
  loadedData: MyLeaguesTableProps[];
  totalPages: number;
  pageNumber: number;
};

export default function MYLeagueTable({
  loadedData,
  totalPages,
  pageNumber,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(pageNumber);

  const pages = Math.ceil(totalPages);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    console.log(hasSearchFilter);

    return loadedData.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [loadedData, filterValue]);

  const renderCell = React.useCallback(
    (league: MyLeaguesTableProps, columnKey: React.Key) => {
      const cellValue = league[columnKey as keyof MyLeaguesTableProps];

      switch (columnKey) {
        case "name":
          return <p className="text-default-700">{league.name}</p>;

        case "weekly":
          return (
            <div className="flex justify-start items-center">
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
            </div>
          );
        case "monthly":
          return (
            <div className="flex justify-start items-center">
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
            </div>
          );
        case "seasonal":
          return (
            <div className="flex justify-start items-center">
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
            </div>
          );

        case "active":
          return (
            <div className="flex justify-start items-center">
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

        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-2">
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

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      console.log(value);
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
              clearButton: "text-black",
            }}
            placeholder="Search by name..."
            size="md"
            startContent={<SearchIcon className="text-black " />}
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
    filteredItems.length,
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
          onChange={(page) => {
            router.push(
              pathname + "?" + createQueryString("page", String(Number(page)))
            );
          }}
        />
      </div>
    );
  }, [pageNumber, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: [
        "bg-transparent",
        "text-default-500",
        "border-b",
        "border-divider",
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
    let index = filteredItems.findIndex((item) => item.id === id);

    return index % 2 === 0;
  };

  return (
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
      <TableBody emptyContent={"Create your league"} items={filteredItems}>
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
