"use client";

import NavButton from "@/components/nav-button";
import { useParams, usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.clientId}`,
      label: "Formulario de ingreso",
    },
    {
      href: `/${params.clientId}/proceso`,
      label: "Vehículos en proceso",
    },
    {
      href: `/${params.clientId}/historial`,
      label: "Historial de lavados",
    },
    {
      href: `/${params.clientId}/configuracion`,
      label: "Configuración",
    },
  ];

  return (
    <nav className="flex items-center gap-x-2 overflow-hidden">
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
