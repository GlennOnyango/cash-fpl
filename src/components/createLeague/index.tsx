"use client";
import React, { useEffect, useMemo } from "react";
import {
  Button,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createLeague } from "@/app/actions";
import { SelectorIcon } from "../icons/SelectorIcon";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

export const currency_select = [
  { key: "USD", label: "USD" },
  { key: "KES", label: "KES" },
];

export const rules_select = [
  { key: "Yes", label: "Yes" },
  { key: "No", label: "No" },
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

export default function CreateLeagueComponent() {
  const [state, formAction] = useFormState(createLeague, initialState);
  const [selected, setSelected] = React.useState(["weekly"]);
  const [limits, setLimits] = React.useState<currency[]>([]);
  const [currency, setCurrency] = React.useState("USD");

  const local_url = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL;

  useEffect(() => {
    fetch(`${local_url}/api/limits?currency=${currency}`)
      .then((res) => res.json())
      .then((data: currency[]) => {
        setLimits(data);
      });
  }, [currency]);

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
    setCurrency(e.target.value);
  };

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
            Public access *
          </label>

          <Select
            placeholder="Select access type"
            required
            name="access"
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
      </div>

      <div className="col-span-3 flex  flex-col sm:flex-row  gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-black/90 dark:text-white/90">
            Select currency the league will use *
          </label>

          <Select
            placeholder="Select access type"
            required
            name="currency"
            radius="lg"
            defaultSelectedKeys={["USD"]}
            className="w-full border-1 border-gray-800 rounded-xl"
            selectorIcon={<SelectorIcon />}
            selectedKeys={[currency]}
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

        <div className="flex flex-col gap-2 w-full">
          <label className="text-black/90 dark:text-white/90">
            Deduct points for excess transfers *
          </label>

          <Select
            placeholder="Select access type"
            required
            name="rules"
            radius="lg"
            defaultSelectedKeys={["Yes"]}
            className="w-full border-1 border-gray-800 rounded-xl"
            selectorIcon={<SelectorIcon />}
          >
            {rules_select.map((acc) => (
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

      <div className="col-span-3 flex  flex-col sm:flex-row  gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-black/90 dark:text-white/90">
            Late payment fine
          </label>

          <Input
            type="text"
            variant="bordered"
            name="fineAmount"
            required
            defaultValue="0"
            placeholder="Enter fine amount"
            endContent={
              <span className="text-gray-900 dark:text-white">{currency}</span>
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
          <Checkbox value="weekly">Weekly competitions</Checkbox>
          <Checkbox value="monthly">Monthly competitions</Checkbox>
          <Checkbox value="seasonal">Seasonal competitions</Checkbox>
        </CheckboxGroup>
      </div>

      <div className="col-span-3 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Set Amounts
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 pb-4">
          Set amounts for the selected competition types and rules. You can set
          amounts for weekly, monthly and seasonal competitions. You can also
          set amounts for extra transactions and late payment fines.
        </p>
      </div>
      <div className="col-span-3 flex flex-col sm:flex-row gap-2">
        {selected.map((type) => (
          <div key={type} className="flex flex-col gap-2 w-full">
            <label className="text-black/90 dark:text-white/90">
              {type} amount *
            </label>

            <Input
              type="text"
              variant="bordered"
              name={`${type}Amount`}
              required
              endContent={
                <span className="text-gray-900 dark:text-white">
                  {currency}
                </span>
              }
              min={
                type === "weekly"
                  ? limit.minWeekly
                  : type === "monthly"
                  ? limit.minMonthly
                  : limit.minSeasonal
              }
              placeholder={`Enter ${type} amount`}
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
        ))}
      </div>

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
        <Button type="submit" className="bg-gray-900 text-white">
          {" "}
          Create{" "}
        </Button>
      </div>
    </form>
  );
}
