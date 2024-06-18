"use client";
import { createUser } from "../app/actions";
import { useFormState } from "react-dom";
import Password from "./inputs/password";
import { useMemo, useState } from "react";
import { SubmitButton } from "./submit";

export type SignUpState = {
  email: string;
  username: string;
  teamId: string;
  password: string;
  confirmPassword: string;
};

const initialState: { errors: string[] } = {
  errors: [],
};

export default function SignUpCashFPL() {
  const [state, formAction] = useFormState(createUser, initialState);
  const [signUpState, setSignUpState] = useState<SignUpState>({
    email: "",
    username: "",
    teamId: "",
    password: "",
    confirmPassword: "",
  });

  const disablSubmit = useMemo(() => {
    return signUpState.password !== signUpState.confirmPassword;
  }, [signUpState.password, signUpState.confirmPassword]);

  return (
    <form
      action={formAction}
      autoComplete="off"
      className="w-full min-w-sm mx-auto"
    >
      <h1 className="text-center text-4xl pb-8 text-black font-medium">
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

      <div className="flex flex-col sm:flex-row sm:space-x-3">
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_email_id"}
            className="block mb-2 text-base text-black"
          >
            {"Email"}
          </label>

          <input
            placeholder="Email"
            type="email"
            id="cash_fpl_email_id"
            name="email"
            value={signUpState.email}
            onChange={(e) =>
              setSignUpState({ ...signUpState, email: e.target.value })
            }
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>

        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_username"}
            className="block mb-2 text-base text-black"
          >
            {"Username"}
          </label>

          <input
            placeholder="Username"
            type="text"
            id="cash_fpl_username"
            name="username"
            value={signUpState.username}
            onChange={(e) =>
              setSignUpState({ ...signUpState, username: e.target.value })
            }
            required={true}
            style={{ height: "3rem" }}
            className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={"cash_fpl_team_id"}
          className="block mb-2 text-base text-black"
        >
          {"Team id"}
        </label>

        <input
          placeholder="Team id"
          type="text"
          id="cash_fpl_team_id"
          name="teamId"
          value={signUpState.teamId}
          onChange={(e) =>
            setSignUpState({ ...signUpState, teamId: e.target.value })
          }
          required={true}
          style={{ height: "3rem" }}
          className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      <div className="flex flex-col sm:flex-row  sm:space-x-3">
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_password"}
            className="block mb-2 text-base text-black"
          >
            {"Password"}
          </label>

          <Password
            id="cash_fpl_password"
            name="password"
            value={signUpState.password}
            required={true}
            setSignUpState={setSignUpState}
            placeholder="Enter your password"
          />
        </div>
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_confirm_password"}
            className="block mb-2 text-base text-black"
          >
            {"Confirm Password"}
          </label>

          <Password
            id="cash_fpl_confirm_password"
            name="confirmPassword"
            value={signUpState.confirmPassword}
            required={true}
            setSignUpState={setSignUpState}
            placeholder="Confirm your password"
          />
        </div>
      </div>

      {disablSubmit && (
        <p className="text-center py-2">
          Password should match confirm password.
        </p>
      )}

      <SubmitButton btnDisabled={disablSubmit} btnText="Sign Up" />

      <div className="flex justify-center w-full max-w-sm mx-auto py-2">
        <a href="/contact-us" className="text-black  hover:text-lg text-sm">
          {`Can't sign up? Get help.`}
        </a>
      </div>
    </form>
  );
}
