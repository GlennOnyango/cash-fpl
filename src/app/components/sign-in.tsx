"use client";
import { useEffect, useMemo, useState } from "react";
import CustomInput from "./customInput";
import { signInUser } from "../actions";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

export type SignInState = {
  email: string;
  password: string;
};

const defaultState = {
  email: "",
  password: "",
};

const initialState = {
  message: "",
};

export default function SignInCashFPL() {
  const [fieldState, setFieldState] = useState<SignInState>(defaultState);
  const [state, formAction] = useFormState(signInUser, initialState);

  useEffect(() => {
    if(state.role === 1){
      redirect("/player");
    }
    else if(state.role === 2){
      redirect("/manager");
    }
  }, [state]);

  const errors = useMemo(() => {
    const error = [];
    for (const key in state?.errors) {
      if (key === "email") error.push(state?.errors.email);
    }
    return error;
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm mx-auto"
      autoComplete="off"
    >
      {errors.map((error, idx) => {
        return (
          <p
            className="bg-red-100 rounded-md py-2 pl-3 my-2 text-gray-900"
            key={idx}
          >
            {error}
          </p>
        );
      })}

      <h1 className="text-center text-white text-4xl py-3 font-medium">
        Welcome back, login to access your account.
      </h1>

      <CustomInput
        placeholder="Email"
        type="text"
        id="email"
        name="email"
        required
        stateChanges={setFieldState}
      />
      <CustomInput
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        required
        stateChanges={setFieldState}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign In
      </button>
    </form>
  );
}
