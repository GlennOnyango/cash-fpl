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
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function HomeNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItemsExpand = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Notifications",
      url: "/notifications",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "FAQs",
      url: "/faqs",
    },
    {
      name: "Contact us",
      url: "/contact-us",
    },
  ];

  const menuItems = [
    ...menuItemsExpand,
    {
      name: "Sign Up",
      url: "/sign-up",
    },
    {
      name: "Login",
      url: "/sign-in",
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
            <p className="font-bold text-xl text-white">Bench Boasters</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItemsExpand.map((item, index) => (
            <NavbarItem isActive={pathname === item.url} key={index}>
              <Link
                aria-current={pathname === item.url ? "page" : "false"}
                href={item.url}
                color={pathname === item.url ? "primary" : "foreground"}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <Link href="/sign-up">Sign Up</Link>
          </NavbarItem>

          <NavbarItem>
            <Button
              as={Link}
              className="text-white"
              color="primary"
              href="/sign-in"
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden w-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="justify-center ">
            <p className="text-3xl text-inherit text-white">Bench Boasters</p>
          </NavbarBrand>

          <NavbarItem>
            <Button
              as={Link}
              size="sm"
              className="text-white"
              color="primary"
              href="/sign-in"
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-gray-800">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href={item.url}
                aria-current={pathname === item.url ? "page" : "false"}
                className={`w-full ${
                  pathname === item.url ? "text-primary" : "text-white"
                } text-xl`}
                
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
