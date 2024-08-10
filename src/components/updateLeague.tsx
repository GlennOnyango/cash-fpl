"use client";
import React, { useEffect, useMemo } from "react";
import {
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { updateLeague } from "@/app/actions";
import { SelectorIcon } from "@/components/icons/SelectorIcon";
import { SubmitButton } from "@/components/submit";
import Competition from "@/components/createLeague/competition";
import { CompetitionTypes, UpdateLeague } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getLimits } from "@/queries";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

export const currency_select = [
  { key: "1", label: "KES" },
  { key: "2", label: "USD" },
];

export const rules_select = [
  { key: "YES", label: "YES" },
  { key: "NO", label: "NO" },
];

const initialState = {
  message: "",
};

type currency = {
  currency: string;
  minWeekly: number;
  minMonthly: number;
  minSeasonal: number;
};

type Props = {
  data: UpdateLeague;
};

export default function UpdateLeagueComponent({ data }: Props) {
  const [updateLeagueData, setUpdateLeagueData] = React.useState(data);
  const {
    data: limits,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["getLimits", `${updateLeagueData.currencyId}`],
    queryFn: async () => {
      const data = getLimits(updateLeagueData.currencyId.toString());
      return data;
    },
  });

  const [state, formAction] = useFormState(updateLeague, initialState);

  const limit = useMemo(() => {
    if (limits?.length) {
      return limits[0];
    }
    return {
      currency: "",
      minWeekly: 0,
      minMonthly: 0,
      minSeasonal: 0,
    };
  }, [limits]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdateLeagueData({
      ...updateLeagueData,
      currencyId: Number(e.target.value),
    } as UpdateLeague);
  };

  return (
    <form
      action={formAction}
      className=" grid grid-cols-3 gap-2 p-4 w-2/3 bg-white overflow-auto rounded-2xl"
      style={{
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      <h3 className="text-4xl text-center font-semibold text-gray-900 dark:text-white col-span-3">
        Update League
      </h3>

      <input type="hidden" name="leagueId" value={updateLeagueData.id} />

      <input type="hidden" name="ownerId" value={updateLeagueData.ownerId} />

      <div className="col-span-3 flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-black/90 dark:text-white/90">
            League Name *
          </label>

          <Input
            type="text"
            variant="bordered"
            name="leageName"
            required
            placeholder="Enter league name"
            value={updateLeagueData.name}
            onChange={(e) => {
              setUpdateLeagueData({
                ...updateLeagueData,
                name: e.target.value,
              });
            }}
            classNames={{
              base: "w-full",
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
          <label className="text-black/90 dark:text-white/90">
            Select currency *
          </label>

          <Select
            placeholder="Select access type"
            required
            name="currency"
            radius="lg"
            defaultSelectedKeys={[updateLeagueData.currencyId.toString()]}
            className="w-full border-1 border-gray-800 rounded-xl"
            selectorIcon={<SelectorIcon />}
            onChange={handleSelectionChange}
          >
            {currency_select.map((acc) => (
              <SelectItem
                key={acc.key}
                className="text-black/90 dark:text-white/90"
              >
                {acc.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="col-span-3 flex flex-col  justify-center items-center mb-4">
        <h3 className="text-xl col-span-1 sm:col-span-3 text-center mb-4 text-black/90 dark:text-white/90">
          Select competition type
        </h3>

        <p className="col-span-3 text-sm text-gray-500 dark:text-gray-300 pt-0 pb-4">
          We have weekly, monthly and seasonal competitions. Weekly competitions
          run every <b>fpl game week</b>, monthly competitions run every{" "}
          <b>fpl game month</b> and seasonal competitions run every season. You
          can select one or more competition types.
        </p>

        <CheckboxGroup
          color="warning"
          orientation="horizontal"
          name="types"
          isRequired
          value={updateLeagueData.types}
          onValueChange={(e) => {
            setUpdateLeagueData({
              ...updateLeagueData,
              types: e,
            });
          }}
        >
          <Checkbox value="WEEKLY">Weekly competitions</Checkbox>
          <Checkbox value="MONTHLY">Monthly competitions</Checkbox>
          <Checkbox value="SEASONAL">Seasonal competitions</Checkbox>
        </CheckboxGroup>
      </div>

      {updateLeagueData.types.map((competition) => {
        const competitionDetails = updateLeagueData.competitionTypes.find(
          (comp) => {
            return comp.competitionDuration === competition;
          }
        );

        return (
          <Competition
            key={competition}
            competition={competition}
            limit={limit}
            competitionProp={{
              amount: competitionDetails?.amount?.toString() || "",
              access: [
                `${competitionDetails?.isPublic ? "public" : "private"}`,
              ],
              penalty: [
                `${
                  competitionDetails?.enableExcessTransferPenalty
                    ? "True"
                    : "False"
                }`,
              ],
              id: competitionDetails?.id || "",
            }}
          />
        );
      })}

      <div className="col-span-3 flex flex-col items-center justify-center">
        {state.message !== "" &&
        state.message !== "League created successfully" ? (
          <p className="bg-red-100 rounded-md py-2 px-3 my-2 text-gray-900">
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="col-span-3 flex flex-col items-center justify-center">
        {state.message === "League created successfully" ? (
          <p className="bg-green-400 rounded-md py-2 px-3 my-2 text-gray-900">
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="col-span-3 flex justify-center py-2">
        <div className="flex flex-col gap-2 w-3/12 ">
          <SubmitButton
            btnText="Update"
            btnDisabled={updateLeagueData.types.length === 0}
          />
        </div>
      </div>
    </form>
  );
}
