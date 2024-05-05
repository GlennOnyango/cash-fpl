"use server";

import { z } from "zod";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const User = z
  .object({
    email: z.string({
      invalid_type_error: "Invalid email",
      required_error: "Email is required",
    }),
    username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Invalid username",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Invalid password",
      })
      .refine((password) => password.length >= 8, {
        message: "Password should be at least 8 characters",
      })
      .refine((password) => password.length <= 20, {
        message: "Password should be at most 20 characters",
      }),
    teamId: z
      .number({
        required_error: "Team is required",
        invalid_type_error: "Invalid team",
        message: "Team should be a number",
      })
      .refine(async (teamId) => {
        const response = await fetch(
          `https://fantasy.premierleague.com/api/entry/${teamId}/`
        );

        const data = await response.json();

        return data.id === teamId;
      }, {
        message: "Team ID does not exist",
      }),

    roleId: z
      .number({
        required_error: "Role is required",
        invalid_type_error: "Invalid role",
      })
      .refine((roleId) => roleId === 1 || roleId === 2, {
        message: "Role should be a player or a manager ID",
      }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
      invalid_type_error: "Invalid confirm password",
      message: "Confirm password should be a string",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
    }
  );

export async function createUser(prevState: any, formData: FormData) {
  const user = await User.safeParseAsync({
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    teamId: Number(formData.get("teamId")),
    roleId: Number(formData.get("role")),
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!user.success) {
    return {
      errors: user.error.flatten().fieldErrors,
    };
  }

  return {
    message: "User created",
  };
}
