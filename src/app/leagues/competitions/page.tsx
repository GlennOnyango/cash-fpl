import ManagerPageNavbar from "@/components/navbars/manager-nav";
import {
  CompetitionTypesProps,
} from "@/utils/types";
import {  fetchPublicCompetitions } from "@/app/actions";
import { redirect } from "next/navigation";
import CompetitionsTable from "./components/App";

export default async function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let competitions: CompetitionTypesProps[] = [];
  let totalPages = 1;
  let pageNumber = Number(searchParams.page);
  let rowsPerPage = 10;

  const publicCompetitions = await fetchPublicCompetitions(
    pageNumber - 1,
    rowsPerPage
  );

  if (publicCompetitions?.message === "UNAUTHORIZED") {
    redirect("/api/auth/logout");
  }

  if (publicCompetitions?.content) {
    competitions = publicCompetitions.content;
  }

  return (
    <ManagerPageNavbar>
      <div
        className="col-span-12 sm:col-span-4 row-span-6 bg-white p-4 rounded-none mt-4 mx-20 overflow-hidden min-h-96"
        
      >
        <h4 className="text-3xl text-black/90 dark:text-white/90 mb-4">
          Competitions
        </h4>
        <CompetitionsTable
          loadedData={competitions}
          totalPages={totalPages}
          pageNumber={pageNumber}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </ManagerPageNavbar>
  );
}
