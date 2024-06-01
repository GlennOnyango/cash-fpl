import PageTemplate from "./components/navbars/landing-nav";

export default function Home() {
  return (
    <PageTemplate>
    <div
      className="flex flex-col items-center justify-center bg-gray-300 py-0"
      style={{ height: "80vh" }}
    >
      <div className="flex flex-col bg-gray-800 p-6 rounded-lg">
        <h1 className="text-white">Cash FPL</h1>
      </div>
    </div>
  </PageTemplate>
  );
}
