"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const local_url = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL;
const authentication_url =
  process.env.NEXT_PUBLIC_EXTERNAL_AUTHENTICATION_API_URL;
const leagues_url = process.env.NEXT_PUBLIC_EXTERNAL_LEAGUES_API_URL;

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
      required_error: "Select league access type",
    }),

    currency: z
      .string({
        required_error: "Currency is required",
        invalid_type_error: "Invalid currency",
        message: "Currency should be a string",
      })
      .refine(async (currency) => {
        const limits_fetched = await fetch(
          `${local_url}/api/limits?currency=${currency}`
        );

        const limits_json = await limits_fetched.json();

        min = limits_json[0];

        return true;
      }),

    types: z.array(
      z.string({
        required_error: "Types are required",
        invalid_type_error: "Invalid types",
        message: "Types should be a string",
      })
    ),
    rules: z.string({
      required_error: "Rules are required",
      invalid_type_error: "Invalid rules",
      message: "Rules should be a string",
    }),
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
    const newUser = await fetch(`${authentication_url}/api/v1/auth/create`, {
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
    });

    if (!newUser.ok) {
      let err = await newUser.json();
      throw new Error(
        err.message || "Failed to create user. Please try again or contact us."
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
    const response = await fetch(`${authentication_url}/api/v1/auth/login`, {
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
    });

    if (!response.ok) {
      throw new Error("Login failed. Please try again or contact us.");
    }

    const res = await response.json();

    cookies().set({
      name: "accessToken",
      value: res.accessToken,
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      //expires in 50 minutes
      expires: new Date(Date.now() + 1000 * 60 * 50),
    });
  } catch (error: any) {
    return {
      errors: error.message,
    };
  }

  redirect("/dashboard");
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
    rules: formData.get("rules") as string,
    types: formData.getAll("types"),
    currency: formData.get("currency") as string,
    weeklyAmount: wkAmount,
    monthlyAmount: mmAmount,
    seasonalAmount: ssnAmount,
    fineAmount: Number(formData.get("fineAmount")),
  });

  if (!league.success) {
    const errorArray: string[] = [];

    const errorObj: any = league.error.flatten().fieldErrors;
    const formErrors: string[] = league.error.flatten().formErrors;

    for (const key in errorObj) {
      errorArray.push(errorObj[key]);
    }

    if (formErrors) {
      errorArray.push(...formErrors);
    }

    return {
      message: errorArray[0],
    };
  }

  try {
    const competitionTypes = league.data.types.map((competition: string) => {
      if (competition === "weekly") {
        return {
          competitionTypeId: 1,
          amount: league.data.weeklyAmount,
        };
      } else if (competition === "monthly") {
        return {
          competitionTypeId: 2,
          amount: league.data.monthlyAmount,
        };
      } else if (competition === "seasonal") {
        return {
          competitionTypeId: 3,
          amount: league.data.seasonalAmount,
        };
      }
    });
    const raw = JSON.stringify({
      name: league.data.name,
      isPublic: league.data.access === "public",
      currencyId: league.data.currency === "KES" ? 1 : 2,
      competitionType: competitionTypes,
      paymentDeadline: "2024-07-29T00:00:00",
      deductExcessTransfers: league.data.rules === "Yes" ? true : false,
      penalties: [
        {
          penaltyType: "AMOUNT",
          value: league.data.fineAmount,
        },
      ],
    });

    //create league
    const newLeague = await fetch(`${leagues_url}/api/v1/league/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: raw,
    });
    console.log("Body<------->", raw);

    if (!newLeague.ok) {
      let err = await newLeague.json();
      console.log("Create League<------->", err);
      throw new Error(
        "Failed to create league. Please try again or contact us."
      );
    }

    revalidateTag("fetchMyLeagues");
    revalidateTag("fetchOpenLeagues");
  } catch (error: any) {
    return {
      message: error.message,
    };
  }

  return {
    message: "League created successfully",
  };
}

// Fetch my leagues
export async function fetchMyLeagues(page: number = 0, size: number = 10) {
  try {
    const response = await fetch(
      `${leagues_url}/api/v1/league/user-leagues?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
        redirect: "follow",
        next: { tags: ["fetchMyLeagues"] },
      }
    );

    if (!response.ok) {
      let err = await response.json();
      console.log("-------", err);

      if (err.httpStatus === "UNAUTHORIZED") {
        throw new Error(err.httpStatus);
      }

      throw new Error(
        err.message ||
          "Failed to fetch leagues. Please try again or contact us."
      );
    }

    const res = await response.json();

    return res;
  } catch (error: any) {
    let err = error.message || "Leagues could not be fetched";
    return {
      message: err,
    };
  }
}

// Fetch public leagues
export async function fetchOpenLeagues(page: number = 0, size: number = 10) {
  try {
    const response = await fetch(
      `${leagues_url}/api/v1/league/public?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
        redirect: "follow",
        next: { tags: ["fetchOpenLeagues"], revalidate: 600 },
      }
    );

    if (!response.ok) {
      let err = await response.json();
      console.log("-------", err);

      if (err.httpStatus === "UNAUTHORIZED") {
        throw new Error(err.httpStatus);
      }

      throw new Error(
        err.message ||
          "Failed to fetch leagues. Please try again or contact us."
      );
    }

    const res = await response.json();

    return res;
  } catch (error: any) {
    let err = error.message || "Leagues could not be fetched";
    return {
      message: err,
    };
  }
}

//Fetch league by id
export async function fetchLeagueById(leagueId: string) {
  try {
    const response = await fetch(`${leagues_url}/api/v1/league/${leagueId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      redirect: "follow",
      next: { tags: ["fetchMyLeaguesById"] },
    });

    if (!response.ok) {
      let err = await response.json();
      console.log("-------", err);

      if (err.httpStatus === "UNAUTHORIZED") {
        throw new Error(err.httpStatus);
      }

      throw new Error(
        err.message ||
          "Failed to fetch your league. Please try again or contact us."
      );
    }

    const res = await response.json();

    console.log("League<------->", res);  

    return res;
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}
