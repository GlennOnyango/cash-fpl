"use client";
import React, { useEffect } from "react";
import {
  Button,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Avatar,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createLeague } from "@/app/actions";
import Link from "next/link";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

const initialState = {
  errors: [],
};

export default function CreateLeagueComponent() {
  const [state, formAction] = useFormState(createLeague, initialState);
  const [selected, setSelected] = React.useState(["weekly"]);
  const [rules, rulesSelected] = React.useState(["tranasction-fine"]);
  const [ur, setUr] = React.useState<string>(
    "https://images.unsplash.com/broken"
  );
  const [currency, setCurrency] = React.useState("USD");

  const handleInputChange = (e: any) => {
    const { name } = e.target;
    if (e.target.files[0] !== undefined) {
      setUr(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full grid grid-cols-3 gap-2 p-2 overflow-auto"
      style={{
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      <div className="col-span-3 flex justify-center items-center">
        <label
          style={{ width: "200px", height: "200px" }}
          className=" flex flex-col items-center justify-center border-2
         border-gray-900  rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className=" flex flex-col items-center justify-center pt-5 pb-6">
            <Avatar
              showFallback={true}
              style={{ width: "200px", height: "200px" }}
              src={ur}
              className="bg-gray-800"
              fallback={
                <div className=" flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-white dark:text-gray-400">
                    <span className="font-semibold">League Logo</span>
                  </p>
                  <p className="text-xs text-center text-white dark:text-gray-400">
                    PNG or JPG (MAX. 800x400px)
                  </p>
                </div>
              }
            />
          </div>
          <input
            id="dropzone-file"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="col-span-3 flex flex-row gap-2">
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
            className="w-full border-1 border-gray-800 rounded-xl"
          >
            {access.map((acc) => (
              <SelectItem key={acc.key}>{acc.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="col-span-3 flex flex-col  justify-center items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white my-4">
          Select currency
        </h3>
        <RadioGroup
          name="currency"
          value={currency}
          onValueChange={setCurrency}
          orientation="horizontal"
        >
          <Radio value="USD">USD</Radio>
          <Radio value="KES">KES</Radio>
        </RadioGroup>
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
          name="rules"
          isRequired
          value={selected}
          onValueChange={setSelected}
        >
          <Checkbox value="weekly">Weekly competitions</Checkbox>
          <Checkbox value="monthly">Monthly competitions</Checkbox>
          <Checkbox value="seasonal">Seasonal competitions</Checkbox>
        </CheckboxGroup>
      </div>

      <div className="col-span-3 flex flex-col justify-center items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
          Select League Rules
        </h3>

        <p className="col-span-3 text-sm text-gray-500 dark:text-gray-300 pb-4">
          You can set rules for the league. You can set rules for extra
          transactions, late payment fines or no rules. If you select no rules,
          the league will have no rules. Do you want to suggest a rule?{" "}
          <Link href={"/suggest-rules"}>click here</Link> .
        </p>
        <CheckboxGroup
          color="warning"
          name="rules"
          orientation="horizontal"
          value={rules}
          isRequired
          onValueChange={(value: string[]) => {
            if (value.includes("none")) {
              rulesSelected(["none"]);
            } else {
              rulesSelected(value);
            }
          }}
        >
          <Checkbox value="tranasction-fine">
            Deduct points for extra transactions
          </Checkbox>
          <Checkbox value="fine">Late payment fine</Checkbox>
          <Checkbox value="none">No Rules</Checkbox>
        </CheckboxGroup>
      </div>

      {rules.includes("none") && (
        <p className="col-span-3 text-center text-gray-500 dark:text-gray-300">
          Deselect No rules to pick other options.
        </p>
      )}

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
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {selected.map((type) => (
          <div key={type} className="flex flex-col gap-2">
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

      <div className="col-span-3 grid grid-cols-3 gap-2 py-2">
        {rules.includes("fine") && (
          <div className="flex flex-col gap-2">
            <label className="text-black/90 dark:text-white/90">
              Late payment fine
            </label>

            <Input
              type="text"
              variant="bordered"
              name="fineAmount"
              required
              placeholder="Enter fine amount"
              endContent={
                <span className="text-gray-900 dark:text-white">
                  {currency}
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
        )}
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
