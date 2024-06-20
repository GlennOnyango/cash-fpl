import PageTemplate from "@/components/navbars/landing-nav";
import SignInCashFPL from "@/components/sign-in";

export default function SignIn() {
  return (
    <PageTemplate>
      <div
        className="grow flex flex-col items-center justify-center px-4 sm:px-0"
      >
        <div className="flex flex-col bg-white p-6 rounded-lg overflow-auto mb-20 sm:mb-0">
          <SignInCashFPL />
        </div>
      </div>
    </PageTemplate>
  );
}
