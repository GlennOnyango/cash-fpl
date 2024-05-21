"use client";
import { useEffect, useMemo, useState } from "react";
import CustomInput from "./customInput";
import ListUser from "./dropdown";
import { createUser } from "../actions";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

export type SignUpState = {
  email: string;
  username: string;
  teamId: string;
  password: string;
  confirmPassword: string;
  role: number;
};

const defaultState = {
  email: "",
  username: "",
  teamId: "",
  password: "",
  confirmPassword: "",
  role: 2,
};

const initialState = {
  message: "",
};

export default function SignUpCashFPL() {
  const [signUpState, setSignUpState] = useState<SignUpState>(defaultState);
  const [state, formAction] = useFormState(createUser, initialState);
  const passwordMatch = useMemo(() => {
    return signUpState.password === signUpState.confirmPassword;
  }, [signUpState]);

  const passwordMatchText = useMemo(() => {
    return (
      (signUpState.password.length > 0 ||
        signUpState.confirmPassword.length > 0) &&
      !passwordMatch
    );
  }, [passwordMatch, signUpState]);

  useEffect(() => {
    if(state.message === "User created"){
      console.log(state);
      // redirect to login page

      redirect("/auth/confirm-email");
    }
  }, [state]);

  const errors = useMemo(() => {
    const error = [];
    for (const key in state?.errors) {
      if (key === "email") error.push(state?.errors.email);
      if (key === "username") error.push(state?.errors.username);
      if (key === "password") error.push(state?.errors.password);
      if (key === "teamId") error.push(state?.errors.teamId);
      if (key === "roleId") error.push(state?.errors.roleId);
    }
    return error;
  }, [state]);

  return (
    <form action={formAction} autoComplete="off" className="w-full min-w-sm mx-auto">
      <h1 className="text-center text-4xl pb-8 text-white font-medium">
        Join our growing community
      </h1>

      {errors.map((error, idx) => {
        return <p className="bg-red-100 rounded-md py-2 pl-3 my-2 text-gray-900" key={idx}>{error}</p>;
      })}

      <input type="hidden" name="role" value={signUpState.role} />

      <div className="flex flex-column space-x-3">
        <CustomInput
          placeholder="Email"
          type="email"
          id="cash_fpl_email_id"
          name="email"
          value={signUpState.email}
          stateChanges={setSignUpState}
          required
        />
        <CustomInput
          placeholder="Username"
          type="text"
          id="cash_fpl_email_username"
          name="username"
          value={signUpState.username}
          stateChanges={setSignUpState}
          required
        />
      </div>

      <div className="flex flex-row space-x-3">
        <CustomInput
          placeholder="Team id"
          type="text"
          id="cash_fpl_team_id"
          name="teamId"
          value={signUpState.teamId}
          stateChanges={setSignUpState}
          required
        />

        <div className="w-full max-w-sm mx-auto">
          <ListUser stateChanges={setSignUpState} />
        </div>
      </div>

      <div className="flex flex-row space-x-3">
        <CustomInput
          placeholder="Password"
          type="password"
          id="cash_fpl_password"
          name="password"
          value={signUpState.password}
          stateChanges={setSignUpState}
          required
        />
        <CustomInput
          placeholder="Confirm Password"
          type="password"
          id="cash_fpl_confirm_password"
          name="confirmPassword"
          value={signUpState.confirmPassword}
          stateChanges={setSignUpState}
          required
        />
      </div>

      <div className="flex flex-row mb-3 justify-center">
        <p
          className={`text-base text-white  ${
            passwordMatchText ? "block" : "hidden"
          }`}
        >
          Passwords do not match
        </p>
      </div>

      <button
        type="submit"
        disabled={!passwordMatch}
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign Up
      </button>
    </form>
  );
}
