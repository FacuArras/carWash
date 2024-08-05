import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { clientId: string };
};

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await prismadb.client.findFirst({
    where: {
      id: params.clientId,
      userId,
    },
  });

  if (!client) {
    redirect("/");
  }

  return (
    <>
      <MobileHeader />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
