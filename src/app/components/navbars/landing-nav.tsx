// not a server-side component, so it can be used in the client
import customTheme from "../customTheme";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function PageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="grow-0 p-4 bg-gray-800">
        <Navbar fluid className="bg-gray-800 px-4">
          <NavbarBrand as={Link} href="/">
            <span className="self-center whitespace-nowrap text-white text-xl font-semibold dark:text-white">
              Captain Cash
            </span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Notifications
            </NavbarLink>
            <NavbarLink
              as={Link}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              href="#"
            >
              About
            </NavbarLink>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </NavbarLink>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              FAQS
            </NavbarLink>
            <NavbarLink
              href="/sign-in"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign in
            </NavbarLink>
            <NavbarLink
              href="/sign-up"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </header>
      <main className="grow flex flex-col  bg-gray-100">{children}</main>
    </>
  );
}
