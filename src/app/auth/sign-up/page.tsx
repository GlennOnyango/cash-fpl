import SignInCashFPL from "@/app/components/sign-in";
import SignUpCashFPL from "@/app/components/sign-up";

export default function SignUp() {
  return (
    <main className="flex max-h-fit flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <SignUpCashFPL/>
      </div>
    </main>
  );
}
