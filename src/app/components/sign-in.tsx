"use client";
import { signInUser } from "../actions";
import { useFormState } from "react-dom";

export type SignInState = {
  email: string;
  password: string;
};

const initialState = {
  errors: "",
};

export default function SignInCashFPL() {
  const [state, formAction] = useFormState(signInUser, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm mx-auto"
      autoComplete="off"
    >
      {state.errors && (
        <p
          className="bg-red-100 rounded-md py-2 pl-3 my-2 text-gray-900"
          key={"error"}
        >
          {`${state.errors}`}
        </p>
      )}

      <h1 className="text-center text-white text-4xl py-3 font-medium">
        Welcome back, login to access your account.
      </h1>
      <div className="w-full max-w-sm mx-auto ">
        <label htmlFor={"email"} className="block mb-2 text-base text-white">
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
        <label htmlFor={"password"} className="block mb-2 text-base text-white">
          {"Password"}
        </label>

        <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          required={true}
          style={{ height: "3rem" }}
          className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign In
      </button>

      <div className="flex justify-center w-full max-w-sm mx-auto py-2">
        <a
          href="/forgot-password"
          className="text-neutral-50  hover:text-lg text-sm"
        >
          Forgot password?
        </a>
      </div>
    </form>
  );
}
