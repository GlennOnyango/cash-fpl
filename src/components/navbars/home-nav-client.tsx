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
        classNames={{
          base: "bg-gray-800",
          wrapper: "dark",
        }}
      >
        <NavbarContent>
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
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/sign-in">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href={item.url}
                aria-current={pathname === item.url ? "page" : "false"}
                color={pathname === item.url ? "primary" : "foreground"}
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
