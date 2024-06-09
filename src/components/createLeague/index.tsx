"use client";
import React, { useEffect } from "react";
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
import Link from "next/link";

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
  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="w-full grid grid-cols-3 gap-2 p-2 overflow-auto"
      style={{
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      <h3 className="col-span-3 text-lg font-semibold text-gray-900 dark:text-white">
        League Details
      </h3>

      <div className="flex flex-col gap-2">
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
      <div className="flex flex-col gap-2">
        <label className="text-black/90 dark:text-white/90">
          Public access *
        </label>

        <Select
          placeholder="Select access type"
          required
          name="access"
          className="max-w-xs border-1 border-gray-800 rounded-xl"
        >
          {access.map((acc) => (
            <SelectItem key={acc.key}>{acc.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          League Logo
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>

      <div className="col-span-3 flex flex-col gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select competition type
        </h3>

        <p className="col-span-3 text-sm text-gray-500 dark:text-gray-300">
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

      <div className="col-span-3 flex flex-col gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select League Rules
        </h3>

        <p className="col-span-3 text-sm text-gray-500 dark:text-gray-300">
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

      {selected.includes("none") && (
        <p>Deselect No rules to pick other options.</p>
      )}

      <h3 className="col-span-3 text-lg font-semibold text-gray-900 dark:text-white">
        Set Amounts
      </h3>
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
        <Button
          type="submit"
          className="bg-gray-900 text-white"
        >
          {" "}
          Create{" "}
        </Button>
      </div>
    </form>
  );
}
