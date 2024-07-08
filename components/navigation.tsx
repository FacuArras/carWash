"use client";

import NavButton from "@/components/nav-button";
import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/",
    label: "Formulario de ingreso",
  },
  {
    href: "/proceso",
    label: "Vehículos en proceso",
  },
  {
    href: "/historial",
    label: "Historial de lavados",
  },
  {
    href: "/configuracion",
    label: "Configuración",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTitle>
          <SheetTrigger className="rounded-md py-2 px-3 border border-input hover:text-accent-foregroundfont-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition">
            <Menu className="size-5" />
          </SheetTrigger>
        </SheetTitle>
        <SheetDescription>
          <SheetContent
            side="right"
            className="px-2 rounded-tl-lg rounded-bl-lg bg-gradient-to-r from-[#006aa1] via-[#005b8a] to-[#004c73] border-none"
          >
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-1 z-50 p-1 rounded-full text-white bg-transparent hover:bg-white/20 transition"
              >
                <X className="size-8" />
              </button>
              <nav className="flex flex-col gap-y-8 pt-16">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant="outline"
                    onClick={() => onClick(route.href)}
                    className={cn(
                      "text-xl font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                      route.href === pathname
                        ? "bg-white/10 text-white"
                        : "bg-transparent"
                    )}
                  >
                    {route.label}
                  </Button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </SheetDescription>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-hidden">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};

export default Navigation;
