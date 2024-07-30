import { Button, Link } from "@nextui-org/react";
import PageTemplate from "../components/navbars/landing-nav";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center gap-8 h-full">
        <div
          className="bg-gray-800 animate-bounce rounded-full w-2/3 sm:w-1/4 h-32 mt-10"
          style={{
            // height: "16vh",
            backgroundImage: "url(/resources/mini.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-col rounded-lg w-3/5 space-y-10">
          <h1 className="text-white text-center text-3xl lg:text-7xl font-semibold text-wrap">
            Level Up Your FPL Game: Play Against the Best, Win Big
          </h1>
          <p className="text-white text-center text-base px-0 sm:px-2">
            Join the thousands of FPL managers taking their passion to the next
            level. Challenge your friends, compete against the best, and prove
            your FPL mastery by winning big on every game week.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" radius="full" as={Link} href="/sign-in">
              Get Started
            </Button>

            <Button
              as={Link}
              href="/about"
              size="lg"
              variant="bordered"
              radius="full"
              className="mb-32 sm:mb-0 text-white"
            >
              <CubeTransparentIcon
                className="block h-6 w-6 pr-1 "
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
