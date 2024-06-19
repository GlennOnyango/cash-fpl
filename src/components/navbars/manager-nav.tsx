
import customTheme from "../customTheme";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export default function ManagerPageNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="grow-0 p-0 px-4 sm:p-2 bg-gray-800">
        <Navbar fluid className="bg-gray-800 ">
          <NavbarBrand as={Link} href="/">
            <span className="self-center whitespace-nowrap text-white text-3xl font-semibold dark:text-white">
              Bench Boasters
            </span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Leagues
            </NavbarLink>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Users
            </NavbarLink>
            <NavbarLink
              as={Link}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              href="#"
            >
              Play
            </NavbarLink>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Statistics
            </NavbarLink>
            <NavbarLink
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Notifications
            </NavbarLink>
            <NavbarLink
              href="/api/auth/logout"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Logout
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </header>
      <main className="grow flex flex-col bg-gray-700 pt-4 overflow-y-auto scroll-smooth">{children}</main>
    </>

  );
}
