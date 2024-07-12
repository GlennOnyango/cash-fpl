import Unrestricted from "@/components/UnrestrictedPage";

export default function About() {
  return (
    <Unrestricted>
      <div className="grow flex flex-col items-center justify-center px-4 sm:px-0">
        <div className="flex flex-col bg-white p-6 rounded-lg overflow-auto mb-20 sm:mb-0">
          <p className="text-black">About us</p>
        </div>
      </div>
    </Unrestricted>
  );
}
