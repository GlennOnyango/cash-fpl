"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ChipProps,
  SortDescriptor,
  Chip,
  Button,
  Link,
} from "@nextui-org/react";
import { columns } from "@/utils/tableData/openLeagueData";
import { CompetitionTypesProps } from "@/utils/types";
import RequestJoinComponentModal from "@/components/requestJoinComponentModal ";

const statusColorMap: Record<string, ChipProps["color"]> = {
  WEEKLY: "primary",
  MONTHLY: "danger",
  SEASONAL: "warning",
};

type Props = {
  loadedData: CompetitionTypesProps[];
  visibleColumns: string[];
};

export default function CompetitionsTable({
  loadedData,
  visibleColumns,
}: Props) {
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
  }, [sortDescriptor, loadedData]);

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
          return <RequestJoinComponentModal competition={competition} />;
        default:
          return cellValue;
      }
    },
    []
  );

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
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
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
