import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  cookies().delete("accessToken");

  redirect("/sign-in");
}
