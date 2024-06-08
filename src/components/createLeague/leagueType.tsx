"use client";
import React, { useEffect } from "react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { setType } from "@/app/actions";

const initialState = {
  errors: [],
};

type Props = {
  disKeys: (value: React.SetStateAction<string[]>) => void;
  displayKey: (value: React.SetStateAction<string>) => void;
};

export default function LeagueTypes({ disKeys, displayKey }: Props) {
  const [state, formAction] = useFormState(setType, initialState);
  const [selected, setSelected] = React.useState(["weekly"]);

  useEffect(() => {
    console.log(state);
    if ("data" in state) {
      disKeys(["create", "rules", "types"]);
      displayKey("amounts");
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full grid grid-cols-2 p-2 gap-4">
      <div className="col-span-2 flex flex-col gap-3">
        <CheckboxGroup
          label="Select League Rules *"
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

      <div className="col-span-2 flex justify-end">
        <Button className="bg-foreground text-background" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
