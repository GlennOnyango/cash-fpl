import SignInCashFPL from "@/app/components/sign-in";

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <SignInCashFPL/>
      </div>
    </main>
  );
}
