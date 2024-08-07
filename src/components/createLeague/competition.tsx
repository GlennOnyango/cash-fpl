"use client";
import React from "react";
import { Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { SelectorIcon } from "@/components/icons/SelectorIcon";
import { capitalize } from "@/utils/utils";
import { currency } from "@/utils/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

export const penalties = [
  { key: "true", label: "True" },
  { key: "false", label: "False" },
];

type CompetitionData = {
  amount: string;
  access: string[];
  penalty: string[];
  id: string;
};

type Props = {
  competition: string;
  limit: currency;
  competitionProp?: CompetitionData;
};

export default function Competition({
  competition,
  limit,
  competitionProp,
}: Props) {
  const [competitionData, setCompetitionData] = React.useState<CompetitionData>(
    competitionProp || {
      amount: "",
      access: ["public"],
      penalty: ["True"],
      id: "",
    }
  );

  return (
    <div className="w-full col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-1 p-1">
      <input
        type="hidden"
        name={`${competition}_id`}
        value={competitionData.id}
      />

      <h4 className="text-xl  col-span-1 sm:col-span-3 text-center mb-4 text-black/90 dark:text-white/90">
        {`${capitalize(competition)}`}
      </h4>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black/90 dark:text-white/90">
          {competition} amount *
        </label>
        <Input
          type="text"
          variant="bordered"
          name={`${competition}_amount`}
          value={competitionData.amount}
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
          isInvalid={
            //regex to check if the amount is a number when input is not empty
            competitionData.amount.length > 0 &&
            !/^\d+$/.test(competitionData.amount)
          }
          onChange={(e) => {
            setCompetitionData({
              ...competitionData,
              amount: e.target.value,
            } as CompetitionData);
          }}
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
            className="text-gray-900 dark:text-white"
            content="Public access brodcasts the league to other users."
          >
            <InformationCircleIcon className="w-5 h-5 text-gray-900 dark:text-white" />
          </Tooltip>
        </div>

        <Select
          placeholder="Select access type"
          required
          name={`${competition}_access`}
          radius="lg"
          defaultSelectedKeys={competitionData.access}
          className="w-full border-1 border-gray-800 rounded-xl"
          selectorIcon={<SelectorIcon />}
          onChange={(e) => {
            setCompetitionData({
              ...competitionData,
              access: [e.target.value],
            } as CompetitionData);
          }}
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
        <div className="flex items-center gap-1">
          <label className="text-black/90 dark:text-white/90">
            {" "}
            Transfer penalty *
          </label>

          <Tooltip
            showArrow={true}
            size="lg"
            className="text-gray-900 dark:text-white"
            content="If set to true, excess transfers will be deducted from the user's total points. "
          >
            <InformationCircleIcon className="w-5 h-5 text-gray-900 dark:text-white" />
          </Tooltip>
        </div>

        <Select
          placeholder="Select access type"
          required
          name={`${competition}_penalty`}
          radius="lg"
          defaultSelectedKeys={competitionData.penalty}
          className="w-full border-1 border-gray-800 rounded-xl"
          selectorIcon={<SelectorIcon />}
          onChange={(e) => {
            setCompetitionData({
              ...competitionData,
              penalty: [e.target.value],
            } as CompetitionData);
          }}
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
    </div>
  );
}
