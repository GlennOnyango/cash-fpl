"use client";
import { useEffect, useMemo, useState } from "react";
import CustomInput from "./customInput";
import ListUser from "./dropdown";

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

export default function SignUpCashFPL() {
  const [signUpState, setSignUpState] = useState<SignUpState>(defaultState);

  const passwordMatch = useMemo(() => {
    return signUpState.password === signUpState.confirmPassword;
  }, [signUpState]);

  const passwordMatchText = useMemo(() => {
    console.log(
      (signUpState.password.length > 0 ||
        signUpState.confirmPassword.length > 0) &&
        !passwordMatch
    );
    return (
      (signUpState.password.length > 0 ||
        signUpState.confirmPassword.length > 0) &&
      !passwordMatch
    );
  }, [passwordMatch, signUpState]);

  return (
    <form className="w-full min-w-sm mx-auto" autoComplete="off">
      <h1 className="text-center text-4xl pb-8 text-white font-medium">
        Join our growing community
      </h1>

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
