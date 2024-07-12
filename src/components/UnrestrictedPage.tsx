import PageTemplate from "@/components/navbars/landing-nav";
import ManagerPageNavbar from "@/components/navbars/manager-nav";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export default function Unrestricted({ children }: Props) {
  const currentValue = cookies().get("accessToken")?.value;

  return currentValue ? (
    <ManagerPageNavbar>{children}</ManagerPageNavbar>
  ) : (
    <PageTemplate>{children}</PageTemplate>
  );
}
