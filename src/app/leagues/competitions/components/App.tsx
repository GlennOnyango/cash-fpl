"use client";
import React, { useCallback, useEffect } from "react";
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
  Chip,
  Button,
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { columns } from "@/utils/tableData/openLeagueData";
import { CompetitionTypesProps } from "@/utils/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const statusColorMap: Record<string, ChipProps["color"]> = {
  WEEKLY: "primary",
  MONTHLY: "danger",
  SEASONAL: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "leagueName",
  "competitionDuration",
  "enableExcessTransferPenalty",
  "amount",
  "currency",
  "actions",
];

type Props = {
  loadedData: CompetitionTypesProps[];
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
};

export default function CompetitionsTable({
  loadedData,
  totalPages,
  pageNumber,
  rowsPerPage,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

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

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...loadedData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((competition) =>
        competition.leagueName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [loadedData, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (pageNumber - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [pageNumber, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort(
      (a: CompetitionTypesProps, b: CompetitionTypesProps) => {
        const first = a[
          sortDescriptor.column as keyof CompetitionTypesProps
        ] as boolean;
        const second = b[
          sortDescriptor.column as keyof CompetitionTypesProps
        ] as boolean;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (competition: CompetitionTypesProps, columnKey: React.Key) => {
      const cellValue = competition[columnKey as keyof CompetitionTypesProps];

      switch (columnKey) {
        case "leagueName":
          return (
            <div className="flex items-center justify-center">
              <Link
                className="text-default-700 text-center hover:text-xl hover:text-blue-500"
                href={`/leagues/open-leagues/${competition.id}`}
              >
                {competition.competitionDuration}
              </Link>
            </div>
          );

        case "competitionDuration":
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[competition.competitionDuration]}
                size="sm"
                variant="dot"
              >
                {cellValue}
              </Chip>
            </div>
          );

        case "enableExcessTransferPenalty":
          return (
            <p
              className={`text-default-700 text-center  ${
                competition.enableExcessTransferPenalty
                  ? "text-green-700"
                  : "text-red-800"
              }`}
            >
              {competition.enableExcessTransferPenalty ? "Yes" : "No"}
            </p>
          );

        case "amount":
          return (
            <p className="text-default-700 text-center">{competition.amount}</p>
          );

        case "currency":
          return <p className="text-default-700 text-center">{"currency"}</p>;

        case "actions":
          return (
            <div className="flex items-center justify-center">
              <Button
                size="md"
                variant="shadow"
                radius="full"
                color="warning"
                as={Link}
                href={`/leagues/open-leagues/${competition.id}`}
              >
                Request join
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
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
            size="md"
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
          page={pageNumber}
          total={totalPages}
          variant="light"
          onChange={(page) => {
            router.push(
              pathname + "?" + createQueryString("page", String(Number(page)))
            );
          }}
        />
      </div>
    );
  }, [selectedKeys, items.length, pageNumber, totalPages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      table: ["border-divider", "overflow-y-auto"],
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
      isStriped
      removeWrapper
      aria-label="Competitions table"
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
      <TableBody emptyContent={"Competitions not found"} items={sortedItems}>
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
