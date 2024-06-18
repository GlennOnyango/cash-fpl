"use server";
import { z } from "zod";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

const limits = [
  { currency: "USD", minWeekly: 5, minMonthly: 10, minSeasonal: 10 },
  { currency: "KES", minWeekly: 100, minMonthly: 100, minSeasonal: 100 },
];

let min = {
  currency: "KES",
  minWeekly: 100,
  minMonthly: 100,
  minSeasonal: 100,
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

const League = z
  .object({
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

    currency: z
      .string({
        required_error: "Currency is required",
        invalid_type_error: "Invalid currency",
        message: "Currency should be a string",
      })
      .refine(async (currency) => {
        const limits_fetched = await fetch(
          `http://localhost:3000/api/limits?currency=${currency}`
        );

        const limits_json = await limits_fetched.json();

        min = limits_json[0];
      }),
    avatar: z.optional(
      z
        .instanceof(File)

        .refine((avatar: File | undefined) => {
          return avatar?.type === "image/png" || avatar?.type === "image/jpeg";
        }, "File must be a PNG or JPG")
        .refine((avatar: File | undefined) => {
          return !avatar || avatar?.size < MAX_UPLOAD_SIZE;
        }, "File size should be less than 3MB")
    ),
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
    weeklyAmount: z.optional(
      z.number({
        invalid_type_error: "Weekly amount should be a number",
      })
    ),
    monthlyAmount: z.optional(
      z.number({
        invalid_type_error: "Monthly amount should be a number",
      })
    ),
    seasonalAmount: z.optional(
      z.number({
        invalid_type_error: "Seasonal amount should be a number",
      })
    ),
    fineAmount: z
      .number({
        invalid_type_error: "Fine should be a number",
      })
      .optional()
      .refine((amount) => !amount || amount >= 1, {
        message: "Fine should be above 1 dollars",
      }),
  })
  .refine(
    async (data) => {
      if (data.weeklyAmount) {
        if (!data.weeklyAmount || data.weeklyAmount < min.minWeekly) {
          return false;
        }
      }

      return true;
    },
    (data) => ({
      message: `Weekly amount should be above ${min.minWeekly} ${data.currency}`,
    })
  )
  .refine(
    (data) => {
      if (data.monthlyAmount) {
        if (!data.monthlyAmount || data.monthlyAmount < min.minMonthly) {
          return false;
        }
      }

      return true;
    },
    (data) => ({
      message: `Monthly amount should be above ${min.minMonthly} ${data.currency}`,
    })
  )
  .refine(
    (data) => {
      if (data.seasonalAmount) {
        if (!data.seasonalAmount || data.seasonalAmount < min.minSeasonal) {
          return false;
        }
      }

      return true;
    },
    (data) => ({
      message: `Seasonal amount should be above ${min.minSeasonal} ${data.currency}`,
    })
  );

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
      throw new Error(
        err.message || "Failed to submit the data. Please try again."
      );
    }
  } catch (error: any) {
    let err = error.message || "User could not be created";
    return {
      errors: [err],
    };
  }
  redirect("/confirm-email");
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
  let wkAmount =
    formData.get("weeklyAmount") === null
      ? undefined
      : Number(formData.get("weeklyAmount"));
  let mmAmount =
    formData.get("monthlyAmount") === null
      ? undefined
      : Number(formData.get("monthlyAmount"));
  let ssnAmount =
    formData.get("seasonalAmount") === null
      ? undefined
      : Number(formData.get("seasonalAmount"));

  const league = await League.safeParseAsync({
    name: formData.get("leageName") as string,
    access: formData.get("access") as string,
    rules: formData.getAll("rules"),
    types: formData.getAll("types"),
    avatar: formData.get("avatar") as File,
    currency: formData.get("currency") as string,
    weeklyAmount: wkAmount,
    monthlyAmount: mmAmount,
    seasonalAmount: ssnAmount,
    fineAmount: Number(formData.get("fineAmount")),
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
    return {
      errors: ["League could not be created"],
    };
  }
}
