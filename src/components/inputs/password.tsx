"use client";
import { Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { SignUpState } from "../sign-up";

type Props = {
  id: string;
  name: string;
  value: string;
  required: boolean;
  placeholder: string;
  setSignUpState?: Dispatch<SetStateAction<SignUpState>>;
};

export default function Password({
  id,
  name,
  value,
  required,
  placeholder,
  setSignUpState,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const sendDetails = (password: string) => {
    if (setSignUpState) {
      setSignUpState((prevState) => ({
        ...prevState,
        [name]: password,
      }));
    }
  };

  return (
    <Input
      id={id}
      name={name}
      value={value}
      required={required}
      variant="bordered"
      placeholder={placeholder}
      onChange={(e) => sendDetails(e.target.value)}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      classNames={{
        base: "w-full mb-4 text-base text-gray-900",
        inputWrapper:
          "h-12 border bg-primary-50 border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900",
        input: [
          "bg-transparent",
          "border-none",
          "focus:ring-0",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
      }}
    />
  );
}
