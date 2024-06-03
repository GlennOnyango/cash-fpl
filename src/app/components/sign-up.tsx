"use client";
import { useEffect, useMemo } from "react";
import { createUser } from "../actions";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { stat } from "fs";

export type SignUpState = {
  email: string;
  username: string;
  teamId: string;
  password: string;
  confirmPassword: string;
};

type fieldErrors = {
  email?: string[] | undefined;
  username?: string[] | undefined;
  password?: string[] | undefined;
  teamId?: string[] | undefined;
  confirmPassword?: string[] | undefined;
};

const initialState: { errors: any } = {
  errors: "",
};

export default function SignUpCashFPL() {
  const [state, formAction] = useFormState(createUser, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form
      action={formAction}
      autoComplete="off"
      className="w-full min-w-sm mx-auto"
    >
      <h1 className="text-center text-4xl pb-8 text-white font-medium">
        Join our growing community
      </h1>

      {state.errors.length > 0 && (
        <p
          className="bg-red-100 rounded-md py-2 pl-3 my-2 text-gray-900"
          key={"error"}
        >
          {state.errors[0]}
        </p>
      )}

      <div className="flex flex-column space-x-3">
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_email_id"}
            className="block mb-2 text-base text-white"
          >
            {"Email"}
          </label>

          <input
            placeholder="Email"
            type="email"
            id="cash_fpl_email_id"
            name="email"
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>

        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_username"}
            className="block mb-2 text-base text-white"
          >
            {"Username"}
          </label>

          <input
            placeholder="Username"
            type="text"
            id="cash_fpl_username"
            name="username"
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={"cash_fpl_team_id"}
          className="block mb-2 text-base text-white"
        >
          {"Team id"}
        </label>

        <input
          placeholder="Team id"
          type="text"
          id="cash_fpl_team_id"
          name="teamId"
          required={true}
          style={{ height: "3rem" }}
          className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
        />

        {/* <div className="w-full max-w-sm mx-auto">
          <ListUser stateChanges={setSignUpState} />
        </div> */}
      </div>

      <div className="flex flex-row space-x-3">
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_password"}
            className="block mb-2 text-base text-white"
          >
            {"Password"}
          </label>

          <input
            placeholder="Password"
            type="password"
            id="cash_fpl_password"
            name="password"
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_confirm_password"}
            className="block mb-2 text-base text-white"
          >
            {"Confirm Password"}
          </label>

          <input
            placeholder="Confirm Password"
            type="password"
            id="cash_fpl_confirm_password"
            name="confirmPassword"
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
      </div>

      {/* <div className="flex flex-row mb-3 justify-center">
        <p
          className={`text-base text-white  ${
            passwordMatchText ? "block" : "hidden"
          }`}
        >
          Passwords do not match
        </p>
      </div> */}

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign Up
      </button>
    </form>
  );
}
