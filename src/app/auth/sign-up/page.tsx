import SignUpCashFPL from "@/app/components/sign-up";

export default function SignUp() {
  return (
    <main
      className="flex flex-col items-center justify-center bg-gray-300 py-0"
      style={{ height: "90vh" }}
    >
      <div className="flex flex-col bg-gray-800 p-6 rounded-lg">
        <SignUpCashFPL />
      </div>
    </main>
  );
}
