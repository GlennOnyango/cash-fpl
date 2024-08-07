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
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

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
      url: "/leagues",
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
          base: "bg-gray-800 px-8",
          wrapper: "dark",
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-xl text-inherit text-white">
              Bench Boasters
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItemsExpand.map((item, index) => {
            // if (item.name === "Leagues") {
            //   return (
            //     <Dropdown key={item.name}>
            //       <NavbarItem isActive={pathname === item.url} key={index}>
            //         <DropdownTrigger>
            //           <Link
            //             aria-current={
            //               pathname.includes("leagues") ? "page" : "false"
            //             }
            //             color={
            //               pathname.includes("leagues")
            //                 ? "primary"
            //                 : "foreground"
            //             }
            //             className="cursor-pointer"
            //           >
            //             {item.name}
            //             <span className="ml-1">
            //               <ChevronDownIcon className="text-small" />
            //             </span>
            //           </Link>
            //         </DropdownTrigger>
            //       </NavbarItem>

            //       <DropdownMenu
            //         aria-label="League features"
            //         className="w-[340px]"
            //         itemClasses={{
            //           base: "gap-4",
            //         }}
            //       >
            //         <DropdownItem
            //           key="competitions"
            //           description="See all public competitions"
            //           href="/leagues/competitions?page=1"
            //           className="text-default-900"
            //         >
            //           Competitions
            //         </DropdownItem>
            //         <DropdownItem
            //           key="my-leagues"
            //           description="See all leagues that you have created"
            //           href="/leagues/my-leagues?page=1"
            //           className="text-default-900"
            //         >
            //           My Leagues
            //         </DropdownItem>
            //         <DropdownItem
            //           key="participating-leagues"
            //           description="See all leagues that you are participating in"
            //           href="/leagues/participating-leagues"
            //           className="text-default-900"
            //         >
            //           Participating Leagues
            //         </DropdownItem>
            //       </DropdownMenu>
            //     </Dropdown>
            //   );
            // }

            return (
              <NavbarItem isActive={pathname === item.url} key={index}>
                <Link
                  aria-current={pathname === item.url ? "page" : "false"}
                  href={item.url}
                  color={pathname === item.url ? "primary" : "foreground"}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        {/* <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/api/auth/logout"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent> */}

        <NavbarContent as="div" justify="end">
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

        <NavbarMenu className="bg-gray-800">
          {menuItems.map((item, index) => {
            // if (item.name === "Leagues") {
            //   return (
            //     <Dropdown key={item.name}>
            //       <NavbarItem isActive={pathname === item.url} key={index}>
            //         <DropdownTrigger>
            //           <Link
            //             aria-current={
            //               pathname.includes("leagues") ? "page" : "false"
            //             }
            //             className={
            //               pathname === item.url ? "text-primary" : "text-white"
            //             }
            //           >
            //             {item.name}
            //             <span className="ml-1">
            //               <ChevronDownIcon className="text-small" />
            //             </span>
            //           </Link>
            //         </DropdownTrigger>
            //       </NavbarItem>

            //       <DropdownMenu
            //         aria-label="League features"
            //         itemClasses={{
            //           base: "gap-4",
            //         }}
            //       >
            //         <DropdownItem
            //           key="competitions"
            //           description="See all public competitions"
            //           href="/leagues/competitions?page=1"
            //           className="text-default-900"
            //         >
            //           Competitions
            //         </DropdownItem>
            //         <DropdownItem
            //           key="my-leagues"
            //           description="See all leagues that you have created"
            //           href="/leagues/my-leagues?page=1"
            //           className="text-default-900"
            //         >
            //           My Leagues
            //         </DropdownItem>
            //         <DropdownItem
            //           key="participating-leagues"
            //           description="See all leagues that you are participating in"
            //           href="/leagues/participating-leagues"
            //           className="text-default-900"
            //         >
            //           Participating Leagues
            //         </DropdownItem>
            //       </DropdownMenu>
            //     </Dropdown>
            //   );
            // }

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
