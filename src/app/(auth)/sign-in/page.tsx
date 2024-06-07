import PageTemplate from "@/components/navbars/landing-nav";
import SignInCashFPL from "@/components/sign-in";

export default function SignIn() {
  return (
    <PageTemplate>
      <div
        className="grow flex flex-col items-center justify-center bg-transparent px-4 sm:px-2"
      >
        <div className="flex flex-col bg-white p-6 rounded-lg">
          <SignInCashFPL />
        </div>
      </div>
    </PageTemplate>
  );
}
