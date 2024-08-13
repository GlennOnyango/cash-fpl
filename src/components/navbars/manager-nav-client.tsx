"use client";
import React from "react";
import { usePathname } from "next/navigation.js";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Link,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

export default function ManagerNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItemsExpand = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Leagues",
      url: "/leagues?page=1",
    },
    {
      name: "Competitions",
      url: "/competitions",
    },
    {
      name: "Analytics",
      url: "/analytics",
    },
    {
      name: "Notifications",
      url: "/notifications",
    },
    {
      name: "Contact us",
      url: "/contact-us",
    },
  ];

  const menuItems = [
    ...menuItemsExpand,
    {
      name: "Logout",
      url: "/api/auth/logout",
    },
  ];

  return (
    <header className="grow-0 p-0 bg-gray-800">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={{
          base: "bg-gray-800",
          wrapper: "dark",
        }}
      >
        <NavbarContent className="hidden sm:flex">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="text-3xl text-inherit text-white">Bench Boasters</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItemsExpand.map((item, index) => {
            return (
              <NavbarItem isActive={pathname === item.url} key={index}>
                <Link
                  aria-current={pathname === item.url ? "page" : "false"}
                  href={item.url}
                  className="text-md"
                  color={pathname === item.url ? "primary" : "foreground"}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent as="div" justify="end" className="hidden sm:flex">
          <Dropdown placement="bottom-end" className="bg-gray-500">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                as={Link}
                className="text-white"
                href="/api/auth/logout"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarContent className="sm:hidden w-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="justify-center">
            <p className="text-3xl text-inherit text-white">
              Bench Boasters
            </p>
          </NavbarBrand>

          <Dropdown placement="bottom-end" className="bg-gray-500">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                as={Link}
                className="text-white"
                href="/api/auth/logout"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenu className="bg-gray-800 ">
          {menuItems.map((item, index) => {
            return (
              <NavbarItem isActive={pathname === item.url} key={index}>
                <Link
                  aria-current={pathname === item.url ? "page" : "false"}
                  href={item.url}
                  className={
                    pathname === item.url ? "text-primary" : "text-white"
                  }
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
