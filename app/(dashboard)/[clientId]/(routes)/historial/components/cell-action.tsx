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
import { MoreHorizontal, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CarColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.clientId}/vehicle/${data.id}`);

      toast.success("Vehículo eliminado.");

      setTimeout(() => {
        window.location.href = `/${params.clientId}/historial`;
      }, 1500);
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          window.location.href = `/${params.clientId}/historial`;
        }}
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
