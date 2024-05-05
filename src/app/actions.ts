"use server";

import { z } from "zod";

const User = z.object({
  email: z.string({
    invalid_type_error: "Invalid email",
  }),
  username: z.string(),
  password: z.string(),
  teamId: z.string(),
  roleId: z.string({
    invalid_type_error: "Invalid role",
    message: "Role should be a player or a manager",
  }),
});

export async function createUser(prevState: any, formData: FormData) {
  const user = User.safeParse({
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    teamId: formData.get("teamId"),
    roleId: formData.get("role"),
  });
  console.log(prevState);

  if (!user.success) {
    return {
      errors: user.error.flatten().fieldErrors,
    };
  }

  return {
    message: "User created",
  };
}
