
import ManagerNav from "./manager-nav-client";

export default function ManagerPageNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ManagerNav />
      <main className="grow flex flex-col bg-gray-700 pt-4 overflow-y-auto scroll-smooth">{children}</main>
    </>

  );
}
