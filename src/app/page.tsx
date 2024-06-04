import PageTemplate from "./components/navbars/landing-nav";
import { Button } from "flowbite-react";

import { PlayCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <PageTemplate>
      <div
        className="flex flex-col grow items-center justify-center bg-gray-800 gap-4 "
      >
        <div
          className="bg-gray-800 rounded-full w-1/4 "
          style={{
            height: "14vh",
            backgroundImage: "url(/resources/mini.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-col p-6 rounded-lg w-3/5 gap-4">
          <h1 className="text-white text-center text-7xl font-semibold text-wrap">
            Level Up Your FPL Game: Play Against the Best, Win Big
          </h1>
          <p className="text-white text-center text-base px-8 py-4">
            Join the thousands of FPL managers taking their passion to the next
            level. Challenge your friends, compete against the best, and prove
            your FPL mastery by winning big on every game week.
          </p>

          <div className="flex flex-row justify-center gap-3 p-4">
            <Button size={"xl"} color={"light"} pill>
              Get Started
            </Button>
            <Button size={"xl"} color={"light"} pill>
              <PlayCircleIcon
                className="block h-6 w-6 pr-1"
                aria-hidden="true"
              />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
