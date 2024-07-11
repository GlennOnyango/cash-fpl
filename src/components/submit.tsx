"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  btnText: string;
  btnDisabled?: boolean;
};

export function SubmitButton({ btnText, btnDisabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  let className = btnDisabled
    ? "bg-gray-400 hover:bg-gray-400"
    : "focus:bg-gray-900 bg-gray-900 hover:bg-gray-900 ";

  return (
    <Button
      type="submit"
      isLoading={pending}
      disabled={btnDisabled}
      className={`w-full px-4 py-2 text-base font-semibold rounded-lg focus:outline-none focus:ring text-white ${className}`}
    >
      {btnText}
    </Button>
  );
}
