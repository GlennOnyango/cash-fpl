import ManagerPageNavbar from "@/components/navbars/manager-nav";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ManagerPageNavbar>
      <div>Open Routes {params.id}</div>
    </ManagerPageNavbar>
  );
}
