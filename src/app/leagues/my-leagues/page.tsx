import ManagerPageNavbar from "@/components/navbars/manager-nav";

export default function page() {
  return (
    <ManagerPageNavbar>
        <div className="col-span-12 sm:col-span-4 row-span-6 bg-white">
            <h1 className="text-black">My Leagues</h1>
        </div>
    </ManagerPageNavbar>
  )
}
