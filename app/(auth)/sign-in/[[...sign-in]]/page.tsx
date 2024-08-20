import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-center">¡Bienvenido!</h1>
      <div className="flex items-center justify-center mt-10">
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground" />
        </ClerkLoading>
      </div>
    </div>
  );
}
