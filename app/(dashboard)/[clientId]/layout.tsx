import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";
import prismadb from "@/lib/prismadb";
import { useConfigurationsStore } from "@/store/configurations";
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

  const configs = await prismadb.configuration.findUnique({
    where: {
      clientId: params.clientId,
    },
  });

  return (
    <>
      <MobileHeader configs={configs!} />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
