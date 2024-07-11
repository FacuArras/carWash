import HeaderLogo from "@/components/header-logo";
import Navigation from "@/components/navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#006aa1] via-[#005b8a] to-[#004c73] px-4 py-4 lg:py-6 lg:px-14 rounded-bl-md rounded-br-md sticky top-0 z-50">
      <div className="w-full flex items-center justify-between flex-row-reverse lg:flex-row">
        <div className="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  fontSize: 20,
                },
              },
            }}
          />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
      </div>
    </header>
  );
};

export default Header;
