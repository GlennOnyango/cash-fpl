// not a server-side component, so it can be used in the client
"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  btn_text: string;
  link:string;
};

export default function AuthButton({ btn_text, link }: Props) {
  return (
    <a
      href={`/auth/${link}`}
      className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      {btn_text}
    </a>
  );
}
