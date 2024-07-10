"use client";
import { Input } from "@nextui-org/react";
import { signInUser } from "../app/actions";
import { useFormState } from "react-dom";
import { useState } from "react";

import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFilledIcon";
import { SubmitButton } from "./submit";

export type SignInState = {
  email: string;
  password: string;
};

const initialState = {
  errors: "",
};

export default function SignInCashFPL() {
  const [state, formAction] = useFormState(signInUser, initialState);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      action={formAction}
      className="w-full max-w-sm mx-auto"
      autoComplete="off"
    >
      {state?.errors && (
        <p
          className="bg-red-100 rounded-md py-2 px-3 my-2 text-center text-gray-900"
          key={"error"}
        >
          {`${state.errors}`}
        </p>
      )}

      <h1 className="text-center text-black text-2xl sm:text-4xl py-3 font-medium">
        Welcome back, login to access your account.
      </h1>
      <div className="w-full max-w-sm mx-auto ">
        <label htmlFor={"email"} className="block mb-2 text-base text-black">
          {"Email"}
        </label>

        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required={true}
          style={{ height: "3rem" }}
          className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
      <div className="w-full max-w-sm mx-auto ">
        <label htmlFor={"password"} className="block mb-2 text-base text-black">
          {"Password"}
        </label>

        <Input
          id="password"
          name="password"
          required={true}
          variant="bordered"
          placeholder="Enter your password"
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
            base: "w-full  py-2 mb-4 text-base text-gray-900",
            inputWrapper:
              "h-12 border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900",
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

      <SubmitButton btnText="Sign In" />

      <div className="flex justify-center w-full max-w-sm mx-auto py-2">
        <a href="/forgot-password" className="text-black hover:text-lg text-sm">
          Forgot password?
        </a>
      </div>
    </form>
  );
}
