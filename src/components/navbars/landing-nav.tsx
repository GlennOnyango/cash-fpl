import HomeNav from "./home-nav-client";

export default function PageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeNav />
      <main className="grow flex flex-col bg-gray-800">{children}</main>
    </>
  );
}
