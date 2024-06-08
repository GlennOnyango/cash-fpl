"use client";
import React, { useEffect } from "react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { setRules } from "@/app/actions";

const initialState = {
  errors: [],
};

type Props = {
  disKeys: (value: React.SetStateAction<string[]>) => void;
  displayKey: (value: React.SetStateAction<string>) => void;
};

export default function Rules({ disKeys, displayKey }: Props) {
  const [state, formAction] = useFormState(setRules, initialState);
  const [selected, setSelected] = React.useState(["tranasction-fine"]);

  useEffect(() => {
    console.log(state);
    if ("data" in state) {
      disKeys(["create", "rules", "amounts"]);
      displayKey("types");
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full grid grid-cols-2 p-2 gap-4">
      <div className="col-span-2 flex flex-col gap-3">
        <CheckboxGroup
          label="Select League Rules *"
          color="warning"
          name="rules"
          value={selected}
          onValueChange={(value: string[]) => {
            if (value.includes("none")) {
              setSelected(["none"]);
            } else {
              setSelected(value);
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

      <div className="col-span-2 flex justify-end">
        <Button className="bg-foreground text-background" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
