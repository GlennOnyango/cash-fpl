import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextResponse) {
  return NextResponse.json({
    limits: [
      { currency: "USD", minWeekly: 5, minMonthly: 10, minSeasonal: 10 },
      { currency: "KES", minWeekly: 100, minMonthly: 100, minSeasonal: 100 },
    ],
  });
}
