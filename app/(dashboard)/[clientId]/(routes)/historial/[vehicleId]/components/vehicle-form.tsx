"use client";

import DeleteHistorialModal from "@/components/modals/delete-historial-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Vehicle } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface VehicleHistorialProps {
  initialData: Vehicle | null;
}

const VehicleHistorial: React.FC<VehicleHistorialProps> = ({ initialData }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onDelete = async () => {
    try {
      window.open(
        `https://wa.me/3516780370?text=El lavadero identificado con el id "${params.clientId}" necesita eliminar el vehículo identificado con el id "${params.vehicleId}".`
      );
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      router.push(`/${params.clientId}/historial`);
      toast.success("Mensaje enviado a soporte.");
    }
  };

  return (
    <>
      <DeleteHistorialModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="pb-2">
        <Heading
          title={"Detalles del vehículo ya lavado"}
          description={
            "Mirá los detalles del vehículo que ya lavaste, si tuviste algún error y querés modificarlo o eliminarlo acá podés hacerlo tocando la opción deseada que directamente te contactará con soporte."
          }
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 px-3 pt-2 md:grid-cols-2 lg:px-0 lg:grid-cols-3 items-center justify-center gap-6 lg:gap-10 mb-10">
        <div>
          <p className="font-semibold block text-md text-[#000f17]">Ingreso</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.createdAt &&
              format(
                new Date(initialData!.createdAt),
                "dd/MM/yy 'a las ' HH:mm'hs'",
                {
                  locale: es,
                }
              )}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Egreso</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.washedAt &&
              format(
                new Date(initialData!.washedAt),
                "dd/MM/yy 'a las ' HH:mm'hs'",
                {
                  locale: es,
                }
              )}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Vehículo</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.vehicle}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Patente</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.licensePlate}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Color</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.color}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Teléfono</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.phoneNumber}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">
            Marca del vehículo
          </p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.brand}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">Precio</p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.price}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">
            Tipo de lavado
          </p>
          <p className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.typeOfCarWash}
          </p>
        </div>

        <div>
          <p className="font-semibold block text-md text-[#000f17]">
            Observaciones
          </p>
          <div className="mt-2 w-full min-h-10 h-fit overflow-y-auto overflow-x-hidden rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
            {initialData!.observations ? initialData!.observations : "Ninguna."}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-4 pt-4">
        <Button
          variant="destructive"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Eliminar Datos
        </Button>
        <Button>Modificar Datos</Button>
      </div>
      <Toaster />
    </>
  );
};

export default VehicleHistorial;
