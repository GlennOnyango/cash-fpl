import PageTemplate from "@/components/navbars/landing-nav";

export default function ConfirmEmail() {
  return (
    <PageTemplate>
      <div
        className="flex flex-col items-center justify-center "
        style={{ height: "80vh" }}
      >
        <div className="flex flex-col bg-gray-800 p-6 rounded-lg">
          <div
            className="flex flex-col space-y-3 justify-center items-center"
            style={{ height: "30vh", width: "30vw" }}
          >
            <h1 className="text-3xl font-semibold text-white">Confirm Email</h1>
            <p className="text-base text-white text-center">
              We have sent you an email with a link to confirm your email.
              Please check your email and click on the link to confirm your
              email.
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
