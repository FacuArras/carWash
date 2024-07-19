"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { CheckIcon, Edit, MoreHorizontal } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Configuration } from "@prisma/client";
import getConfigurations from "@/hooks/get-configurations";

interface CellActionProps {
  data: CarColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [configurations, setConfigurations] = useState<Configuration>({
    id: "",
    vehicle: [],
    typeOfCarWash: [],
    message: "",
    clientId: "",
  });

  async function getConfigs() {
    const clientId = Array.isArray(params.clientId)
      ? params.clientId[0]
      : params.clientId;

    const configs = await getConfigurations(clientId);
    setConfigurations(configs);
    return configs;
  }

  useEffect(() => {
    getConfigs();
  }, []);

  function reemplazarPalabras(
    cadena: string,
    datos: { [key: string]: string }
  ): string {
    const reemplazos: { [key: string]: string } = {
      vehículo: datos.vehicle,
      color: datos.color,
      patente: datos.licensePlate,
      precio: datos.price,
      tipo: datos.typeOfCarWash,
      ingreso: datos.createdAt,
    };

    return cadena.replace(/'([^']+)'/g, (match, p1) => {
      if (reemplazos[p1]) {
        return reemplazos[p1];
      }

      return match;
    });
  }

  const onReady = async () => {
    try {
      await axios.patch(`/api/${params.clientId}/vehicle/${data.id}/ready`, {
        washed: true,
      });

      toast.success("Vehículo lavado!");

      const mensajeReemplazado = reemplazarPalabras(
        configurations.message,
        data
      );

      window.open(
        `https://wa.me/${data.phoneNumber}?text=${mensajeReemplazado}`
      );

      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error) {
      toast.error("Algo salió mal...");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={onReady} className="cursor-pointer">
            <CheckIcon className="mr-2 h-4 w-4" />
            Lavado
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.clientId}/proceso/${data.id}`)
            }
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Modificar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  );
};
