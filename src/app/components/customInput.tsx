"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { SignUpState } from "./sign-up";

type CustomInputProps = {
  placeholder: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  required?: boolean;
  stateChanges: Dispatch<SetStateAction<SignUpState>>;
};

export default function CustomInput({
  placeholder,
  type,
  id,
  name,
  value,
  required,
  stateChanges,
}: CustomInputProps) {
  const changes = (e: any) => {
    stateChanges((prev: SignUpState) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto ">
      <label htmlFor={id} className="block mb-2 text-base text-white">
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={changes}
        required={required}
        value={value}
        style={{height: "3rem"}}
        className="block w-full px-4 py-2 mb-4 text-base text-gray-900 placeholder-gray-900 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-gray-900 focus:border-gray-900"
      />
    </div>
  );
}
