import SignInCashFPL from "@/app/components/sign-in";

export default function SignIn() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-300 py-0"  style={{ height: "90vh" }}>
      <div className="flex flex-col bg-gray-800 p-6 rounded-lg">
        <SignInCashFPL />
      </div>
    </main>
  );
}
