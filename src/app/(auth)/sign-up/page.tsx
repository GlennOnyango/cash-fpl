import PageTemplate from "@/components/navbars/landing-nav";
import SignUpCashFPL from "@/components/sign-up";

export default function SignUp() {
  return (
    <PageTemplate>
      <div className="grow flex flex-col items-center justify-center bg-transparent px-4 sm:px-0">
        <div className="flex flex-col bg-white p-6 rounded-lg  overflow-auto mt-10 mb-20 sm:mt-0 sm:mb-0">
          <SignUpCashFPL />
        </div>
      </div>
    </PageTemplate>
  );
}
