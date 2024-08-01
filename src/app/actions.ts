"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { User, signUser } from "@/utils/schemas";

const local_url = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL;
const authentication_url =
  process.env.NEXT_PUBLIC_EXTERNAL_AUTHENTICATION_API_URL;
const leagues_url = process.env.NEXT_PUBLIC_EXTERNAL_LEAGUES_API_URL;

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
  const league_object = {
    name: formData.get("leageName") as string,
    leagueStatus: "ACTIVE", //ACTIVE,CLOSED,PAUSED,SUSPENDED
    newPlayerJoinsAll: false,
    currencyId: Number(formData.get("currency")),
    competitionType: formData.getAll("types").map((comp) => {
      return {
        competitionDuration: comp,
        amount: formData.get(`${comp}_amount`),
        isPublic: (formData.get(`${comp}_access`) as string) === "public",
        enableExcessTransferPenalty:
          (formData.get(`${comp}_penalty`) as string) === "True",
      };
    }),
  };

  try {
    const raw = JSON.stringify(league_object);

    //create league
    const newLeague = await fetch(`${leagues_url}/api/v1/league/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: raw,
    });

    if (!newLeague.ok) {
      let err = await newLeague.json();
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

export async function updateLeague(prevState: any, formData: FormData) {
  const league_object = {
    id: formData.get("leagueId") as string,
    name: formData.get("leageName") as string,
    ownerId: formData.get("ownerId") as string,
    leagueStatus: "ACTIVE", //ACTIVE,CLOSED,PAUSED,SUSPENDED
    newPlayerJoinsAll: (formData.get("newPlayerJoinsAll") as string) === "True",
    currencyId: (formData.get("currencyId") as string) === "KES" ? 1 : 2,
    competitionType: formData.getAll("types").map((comp) => {
      return {
        competitionDuration: comp,
        amount: formData.get(`${comp}_amount`),
        isPublic: (formData.get(`${comp}_access`) as string) === "public",
        enableExcessTransferPenalty:
          (formData.get(`${comp}_penalty`) as string) === "True",
        id: formData.get(`${comp}_id`),
        leagueId: formData.get("leagueId") as string,
      };
    }),
  };

  try {
    const raw = JSON.stringify(league_object);

    //create league
    const newLeague = await fetch(`${leagues_url}/api/v1/league/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: raw,
    });

    if (!newLeague.ok) {
      let err = await newLeague.json();
      throw new Error(
        "Failed to update league. Please try again or contact us."
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
    message: "League updated successfully",
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

export async function fetchPublicCompetitions(
  page: number = 0,
  size: number = 10
) {
  try {
    const response = await fetch(
      `${leagues_url}/api/v1/league/competitions/public?page=${page}&size=${size}`,
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

      if (err.httpStatus === "UNAUTHORIZED") {
        throw new Error(err.httpStatus);
      }

      throw new Error(
        err.message ||
          "Failed to fetch your league. Please try again or contact us."
      );
    }

    const res = await response.json();

    return res;
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}

//Post league join request

export async function joinCompetitionAction(
  prevState: any,
  formData: FormData
) {
  const competition_object = {
    leagueId: formData.get("leagueId") as string,
    competition: formData.get("competition") as string,
  };


  try {
    const raw = JSON.stringify(competition_object);

    //join competition
    const newLeague = await fetch(`${leagues_url}/api/v1/league/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: raw,
    });

    if (!newLeague.ok) {
      let err = await newLeague.json();
      throw new Error(
        "Failed to join the competition. Please try again or contact us."
      );
    }

    revalidateTag("fetchOpenLeagues");
  } catch (error: any) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Request join sent successfully",
  };
}
