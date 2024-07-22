"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bolt, ClipboardPenLine, Droplets, History } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

const MobileHeader = () => {
  const params = useParams();
  const pathname = usePathname();

  return (
    <header className="md:hidden bg-gradient-to-r from-[#006aa1] via-[#005b8a] to-[#004c73] px-4 py-1.5 min-h-16 rounded-tl-lg rounded-tr-lg fixed bottom-0 w-full z-50 flex items-center justify-between">
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "hover:bg-white/20 hover:text-white bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent border-none rounded-full py-6 outline-none text-white focus:bg-white/30 transition",
          pathname === `/${params.clientId}`
            ? "bg-white/10 text-white"
            : "bg-transparent"
        )}
      >
        <Link href={`/${params.clientId}`}>
          <ClipboardPenLine />
        </Link>
      </Button>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "hover:bg-white/20 hover:text-white bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent border-none rounded-full py-6 outline-none text-white focus:bg-white/30 transition",
          pathname === `/${params.clientId}/proceso`
            ? "bg-white/10 text-white"
            : "bg-transparent"
        )}
      >
        <Link href={`/${params.clientId}/proceso`}>
          <Droplets />
        </Link>
      </Button>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "hover:bg-white/20 hover:text-white bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent border-none rounded-full py-6 outline-none text-white focus:bg-white/30 transition",
          pathname === `/${params.clientId}/historial`
            ? "bg-white/10 text-white"
            : "bg-transparent"
        )}
      >
        <Link href={`/${params.clientId}/historial`}>
          <History />
        </Link>
      </Button>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "hover:bg-white/20 hover:text-white bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent border-none rounded-full py-6 outline-none text-white focus:bg-white/30 transition",
          pathname === `/${params.clientId}/configuracion`
            ? "bg-white/10 text-white"
            : "bg-transparent"
        )}
      >
        <Link href={`/${params.clientId}/configuracion`}>
          <Bolt />
        </Link>
      </Button>
    </header>
  );
};

export default MobileHeader;
