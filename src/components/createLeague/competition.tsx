"use client";
import React, { useEffect, useMemo } from "react";
import { Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { SelectorIcon } from "@/components/icons/SelectorIcon";
import { capitalize } from "@/utils/utils";
import { currency } from "@/utils/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

export const currency_select = [
  { key: "USD", label: "USD" },
  { key: "KES", label: "KES" },
];

export const penalties = [
  { key: "true", label: "True" },
  { key: "false", label: "False" },
];

type Props = {
  competition: string;
  limit: currency;
};

export default function Competition({ competition, limit }: Props) {
  return (
    <div className="w-full col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
      <h4 className="text-2xl font-bold col-span-2 text-center mb-4 text-black/90 dark:text-white/90">
        {`${capitalize(competition)}`}
      </h4>
      <div key={"week"} className="flex flex-col gap-2 w-full">
        <label className="text-black/90 dark:text-white/90">
          {competition} amount *
        </label>
        <Input
          type="text"
          variant="bordered"
          name={`${competition}_amount`}
          required
          endContent={
            <span className="text-gray-900 dark:text-white">
              {limit.currency}
            </span>
          }
          min={
            competition === "weekly"
              ? limit.minWeekly
              : competition === "monthly"
              ? limit.minMonthly
              : limit.minSeasonal
          }
          placeholder={`Enter ${competition} amount`}
          classNames={{
            base: "w-full ",
            inputWrapper: "border-1 border-gray-800",
            input: [
              "bg-transparent",
              "border-none",
              "focus:ring-0",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
          }}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-1">
          <label className="text-black/90 dark:text-white/90">Set access</label>

          <Tooltip
            showArrow={true}
            size="lg"
            content="Public access brodcasts the league to other users. Private access restricts the league to only users with the league code."
          >
            <InformationCircleIcon className="w-5 h-5 text-gray-900 dark:text-white" />
          </Tooltip>
        </div>

        <Select
          placeholder="Select access type"
          required
          name={`${competition}_access`}
          radius="lg"
          defaultSelectedKeys={["public"]}
          className="w-full border-1 border-gray-800 rounded-xl"
          selectorIcon={<SelectorIcon />}
        >
          {access.map((acc) => (
            <SelectItem
              key={acc.key}
              className="text-black/90 dark:text-white/90"
            >
              {acc.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-black/90 dark:text-white/90">
          Points deductions for excess transfers *
        </label>

        <Select
          placeholder="Select access type"
          required
          name={`${competition}_penalty`}
          radius="lg"
          defaultSelectedKeys={["True"]}
          className="w-full border-1 border-gray-800 rounded-xl"
          selectorIcon={<SelectorIcon />}
        >
          {penalties.map((acc) => (
            <SelectItem
              key={acc.label}
              className="text-black/90 dark:text-white/90"
            >
              {acc.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-black/90 dark:text-white/90">
          Late payment fine
        </label>

        <Input
          type="text"
          variant="bordered"
          name={`${competition}_fine_amount`}
          required
          defaultValue="0"
          placeholder="Enter fine amount"
          endContent={
            <span className="text-gray-900 dark:text-white">
              {limit.currency}
            </span>
          }
          classNames={{
            base: "w-full ",
            inputWrapper: "border-1 border-gray-800",
            input: [
              "bg-transparent",
              "border-none",
              "focus:ring-0",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
          }}
        />
      </div>
    </div>
  );
}
