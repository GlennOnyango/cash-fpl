import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const currencyId = req.nextUrl.searchParams.get("currencyId");

  const limits = [
    {
      id: 1,
      currency: "KES",
      minWeekly: 100,
      minMonthly: 100,
      minSeasonal: 100,
    },
    { id: 2, currency: "USD", minWeekly: 5, minMonthly: 10, minSeasonal: 10 },
  ];

  return NextResponse.json(
    currencyId
      ? limits.filter((limit) => limit.id === Number(currencyId))
      : limits
  );
}
