"use server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const prisma = new PrismaClient();

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
      .refine(
        async (teamId) => {
          console.log(teamId);
          try {
            const response = await fetch(
              `https://fantasy.premierleague.com/api/entry/${teamId}/`
            );

            const data = await response.json();

            console.log(data);

            return data.id === teamId;
          } catch (e) {
            console.log("asdsadas", e);
            return false;
          }
        },
        {
          message: "Team ID does not exist",
        }
      ),

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

const signUser = z.object({
  email: z.string({
    invalid_type_error: "Invalid email",
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Invalid password",
  }),
});

export async function createUser(prevState: any, formData: FormData) {
  const user = await User.safeParseAsync({
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    teamId: Number(formData.get("teamId")),
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!user.success) {
    return {
      errors: user.error.flatten().fieldErrors,
    };
  }

  const newUser = await prisma.user.create({
    data: {
      email: user.data.email,
      username: user.data.username,
      password: user.data.password,
      teamId: user.data.teamId,
    },
  });

  if (!newUser) {
    return {
      errors: "User could not be created",
    };
  } else {
    redirect("/auth/confirm-email");
  }
}

export async function signInUser(prevState: any, formData: FormData) {
  const user = await signUser.safeParseAsync({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!user.success) {
    return {
      errors: user.error.flatten().fieldErrors,
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: user.data.email,
      password: user.data.password,
    },
  });

  if (!userExists) {
    return {
      errors: "User does not exist",
    };
  } else {
    console.log(userExists);
    cookies().set("credentials", `${userExists.id}`, { secure: true });
    cookies().set("team", `${userExists.teamId}`, { secure: true });

    redirect("/dashboard");
  }
}

export async function signOut() {
  cookies().delete("credentials");
  cookies().delete("team");

  redirect("/");
}
