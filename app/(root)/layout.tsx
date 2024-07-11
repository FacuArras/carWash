import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await prismadb.client.findFirst({
    where: {
      userId,
    },
  });

  if (client) {
    redirect(`/${client.id}`);
  }

  return <>{children}</>;
}
