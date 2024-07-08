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
import { CheckIcon, Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CarColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/vehicleForm/${data.id}`);

      toast.success("Vehículo eliminado.");
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      window.location.href = `/proceso`;
      setLoading(false);
      setOpen(false);
    }
  };

  const onReady = async () => {
    try {
      await axios.patch(`/api/vehicleForm/${data.id}/ready`, { washed: true });

      toast.success("Vehículo lavado!");

      window.open(
        `https://wa.me/${data.phoneNumber}?text=Tu ${data.vehicle} patente "${data.licensePlate}" de color ${data.color}, ya está listo para que lo retires!`
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
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
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
            onClick={() => router.push(`/proceso/${data.id}`)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Modificar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  );
};
