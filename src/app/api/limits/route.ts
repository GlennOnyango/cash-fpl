import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const currency = req.nextUrl.searchParams.get("currency");

  const limits = [
    { currency: "USD", minWeekly: 5, minMonthly: 10, minSeasonal: 10 },
    { currency: "KES", minWeekly: 100, minMonthly: 100, minSeasonal: 100 },
  ];

  console.log("GET /api/limits", currency);

  return NextResponse.json(
    currency ? limits.filter((limit) => limit.currency === currency) : limits
  );
}
