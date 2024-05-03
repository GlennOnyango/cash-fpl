import CustomInput from "./customInput";

export default function SignInCashFPL() {
  return (
    <form className="w-full max-w-sm mx-auto" autoComplete="off">
      <h1 className="text-center text-4xl py-3 font-medium">
        Welcome back, login to access your account.
      </h1>

      <CustomInput placeholder="Email" type="text" id="cash_fpl_id" name="cash_fpl_name"/>
      <CustomInput placeholder="Password" type="password" id="cash_fpl_password" name="cash_fpl_password"/>

      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:bg-gray-900 focus:bg-gray-900"
      >
        Sign In
      </button>
    </form>
  );
}
