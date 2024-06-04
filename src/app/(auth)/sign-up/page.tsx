import PageTemplate from "@/app/components/navbars/landing-nav";
import SignUpCashFPL from "@/app/components/sign-up";

export default function SignUp() {
  return (
    <PageTemplate>
      <div
        className="grow flex flex-col items-center justify-center bg-transparent px-2 sm:px-0 "
      >
        <div className="flex flex-col bg-white p-6 rounded-lg">
          <SignUpCashFPL />
        </div>
      </div>
    </PageTemplate>
  );
}
