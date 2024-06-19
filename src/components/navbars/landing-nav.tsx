import HomeNav from "./home-nav-client";

export default function PageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeNav />
      <main className="grow flex flex-col bg-gray-700 pt-4 overflow-y-auto scroll-smooth">{children}</main>
    </>
  );
}
