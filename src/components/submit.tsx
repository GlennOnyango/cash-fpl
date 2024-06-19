"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  btnText: string;
  btnDisabled?: boolean;
};

export function SubmitButton({ btnText, btnDisabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      disabled={btnDisabled}
      className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
    >
      {btnText}
    </Button>
  );
}
