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
import { createLeague } from "@/app/actions";
import { SelectorIcon } from "../icons/SelectorIcon";
import { SubmitButton } from "../submit";
import Competition from "./competition";
import { getLimits } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const currency_select = [
  { key: "1", label: "KES" },
  { key: "2", label: "USD" },
];

const initialState = {
  message: "",
};

type Props = {
  onClose: () => void;
};

export default function CreateLeagueComponent({ onClose }: Props) {
  const [state, formAction] = useFormState(createLeague, initialState);
  const [selected, setSelected] = React.useState(["WEEKLY"]);
  const [currency, setCurrency] = React.useState(["1"]);

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
    queryKey: ["getLimits", `${currency[0]}`],
    queryFn: async () => {
      const data = getLimits(currency[0]);
      return data;
    },
  });

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
    setCurrency([e.target.value]);
  };

  useEffect(() => {
    if (state.message === "League created successfully") {
      onClose();
    }
  }, [state.message]);

  return (
    <form
      action={formAction}
      className="w-full grid grid-cols-3 gap-2 p-2 overflow-auto"
      style={{
        maxHeight: "calc(100vh - 200px)",
      }}
    >
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
            defaultSelectedKeys={["1"]}
            className="w-full border-1 border-gray-800 rounded-xl"
            selectorIcon={<SelectorIcon />}
            selectedKeys={currency}
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
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
          value={selected}
          onValueChange={setSelected}
        >
          <Checkbox value="WEEKLY">Weekly competitions</Checkbox>
          <Checkbox value="MONTHLY">Monthly competitions</Checkbox>
          <Checkbox value="SEASONAL">Seasonal competitions</Checkbox>
        </CheckboxGroup>
      </div>

      {selected.map((competition) => {
        return (
          <Competition
            key={competition}
            competition={competition}
            limit={limit}
          />
        );
      })}
      {/* 
      <div className="col-span-3 flex flex-col justify-center items-center w-full mt-4">
        <Checkbox name="newPlayerJoinsAll" value={"True"} defaultSelected>
          New players should join all leagues on entry
        </Checkbox>
      </div> */}

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
          <SubmitButton btnText="Create" btnDisabled={selected.length === 0} />
        </div>
      </div>
    </form>
  );
}
