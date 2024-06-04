"use client";
import { createUser } from "../actions";
import { useFormState } from "react-dom";

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
          required={true}
          style={{ height: "3rem" }}
          className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
        />

        {/* <div className="w-full max-w-sm mx-auto">
          <ListUser stateChanges={setSignUpState} />
        </div> */}
      </div>

      <div className="flex flex-col sm:flex-row  sm:space-x-3">
        <div className="w-full max-w-sm mx-auto ">
          <label
            htmlFor={"cash_fpl_password"}
            className="block mb-2 text-base text-black"
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
            className="block mb-2 text-base text-black"
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

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign Up
      </button>

      <div className="flex justify-center w-full max-w-sm mx-auto py-2">
        <a
          href="/contact-us"
          className="text-black  hover:text-lg text-sm"
        >
          {`Can't sign up? Get help.`}
        </a>
      </div>
    </form>
  );
}
