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
          try {
            const response = await fetch(
              `https://fantasy.premierleague.com/api/entry/${teamId}/`
            );

            const data = await response.json();

            return data.id === teamId;
          } catch (e) {
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

const League = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Invalid name",
    message: "Name should be a string",
  }),
  access: z.string({
    required_error: "Access is required",
    invalid_type_error: "Invalid access",
    message: "Access should be a string",
  }),
  avatar: z.string({
    invalid_type_error: "Invalid avatar",
    message: "Avatar should be a string",
  }),
  types: z.array(
    z.string({
      required_error: "Types are required",
      invalid_type_error: "Invalid types",
      message: "Types should be a string",
    })
  ),
  rules: z.array(
    z.string({
      required_error: "Rules are required",
      invalid_type_error: "Invalid rules",
      message: "Rules should be a string",
    })
  ),
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
    const errorArray: string[] = [];

    const errorObj: any = user.error.flatten().fieldErrors;
    const formErrors: any = user.error.flatten().formErrors;

    for (const key in errorObj) {
      errorArray.push(errorObj[key]);
    }

    if (formErrors) {
      errorArray.push(formErrors);
    }

    return {
      errors: errorArray,
    };
  }

  try {
    const newUser = await fetch(
      "https://ms-authentication-abof.onrender.com/api/v1/auth/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: user.data.username,
          email: user.data.email,
          password: user.data.password,
          teamId: user.data.teamId,
        }),
        redirect: "follow",
      }
    );

    if (!newUser.ok) {
      let err = await newUser.json();
      console.log(err);
      throw new Error(
        err.message || "Failed to submit the data. Please try again."
      );
    }

    redirect("/auth/confirm-email");
  } catch (error: any) {
    let err = error.message || "User could not be created";
    return {
      errors: [err],
    };
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

  try {
    const response = await fetch(
      "https://ms-authentication-abof.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: user.data.email,
          password: user.data.password,
        }),
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit the data. Please try again.");
    }

    const res = await response.json();

    cookies().set("accessToken", `${res.accessToken}`, { secure: true });
  } catch (error: any) {
    let err = error.message || "User could not be created";
    return {
      errors: err,
    };
  }

  redirect("/dashboard");
}

export async function signOut() {
  cookies().delete("accessToken");

  redirect("/");
}

// Leagues

export async function createLeague(prevState: any, formData: FormData) {
  const league = await League.safeParseAsync({
    name: formData.get("leageName") as string,
    access: formData.get("access") as string,
    rules: formData.getAll("rules"),
    types: formData.getAll("types"),
  });

  if (!league.success) {
    const errorArray: string[] = [];

    const errorObj: any = league.error.flatten().fieldErrors;
    const formErrors: any = league.error.flatten().formErrors;

    for (const key in errorObj) {
      errorArray.push(errorObj[key]);
    }

    if (formErrors) {
      errorArray.push(formErrors);
    }

    return {
      errors: errorArray,
    };
  }

  try {
    return {
      data: "League created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      errors: ["League could not be created"],
    };
  }
}
