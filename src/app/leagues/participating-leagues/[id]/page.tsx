import ManagerPageNavbar from "@/components/navbars/manager-nav";

export default function page({ params }: { params: { id: string } }) {
    return (
        <ManagerPageNavbar>
          <div>Participating League {params.id}</div>
        </ManagerPageNavbar>
      );
}
