import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-center">¡Bienvenido de vuelta!</h1>
      <div className="flex items-center justify-center mt-10">
        <ClerkLoaded>
          <SignUp />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground" />
        </ClerkLoading>
      </div>
    </div>
  );
}
