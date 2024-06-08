"use client";
import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createLeague } from "@/app/actions";

export const access = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

const initialState = {
  errors: [],
};

type Props = {
  disKeys: (value: React.SetStateAction<string[]>) => void;
  displayKey: (value: React.SetStateAction<string>) => void;
};

export default function Amount({ disKeys, displayKey }: Props) {
  const [state, formAction] = useFormState(createLeague, initialState);

  useEffect(() => {
    console.log(state);
    if ("data" in state) {
      disKeys(["create", "types", "amounts"]);
      displayKey("rules");
    }
  }, [state]);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="w-full grid grid-cols-2 p-2 gap-4"
    >
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
        <label className="text-black/90 dark:text-white/90">League Logo</label>
        <Input
          type="file"
          variant="flat"
          radius="none"
          classNames={{
            base: "w-full rounded-xl",
            inputWrapper: "border-1 border-gray-800 roundex-xl",
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
      <div className="col-span-2 flex justify-end">
        <Button className="bg-foreground text-background" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
