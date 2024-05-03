"use client";
import { useState } from "react";
import CustomInput from "./customInput";
import ListUser from "./dropdown";

export type SignUpState = {
  email: string;
  username: string;
  teamId: string;
  password: string;
  confirmPassword: string;
};

const defaultState = {
  email: "",
  username: "",
  teamId: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpCashFPL() {
  const [signUpState, setSignUpState] = useState<SignUpState>(defaultState);
  
  return (
    <form className="w-full max-w-sm mx-auto" autoComplete="off">
      <h1 className="text-center text-4xl py-3 font-medium">
        Join our growing community.
      </h1>

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
      <CustomInput
        placeholder="Team id"
        type="text"
        id="cash_fpl_team_id"
        name="teamId"
        value={signUpState.teamId}
        stateChanges={setSignUpState}
        required
      />
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

      <div className="relative mt-2 mb-4">
        <ListUser />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign Up
      </button>
    </form>
  );
}
