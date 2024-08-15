"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, Droplets } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { sendMessage } from "@/actions/send-message";
import { Vehicle } from "../page";

type WashingVehiclesProps = {
  data: Vehicle[];
  onChangeStatus: (vehicleId: string) => void;
};

const WashingVehicles = ({ data, onChangeStatus }: WashingVehiclesProps) => {
  const [washingVehicles, setWashingVehicles] = useState<Vehicle[]>(data);
  const router = useRouter();
  const params = useParams();

  const onWashed = async (vehicleId: string) => {
    try {
      const clientId = Array.isArray(params.clientId)
        ? params.clientId[0]
        : params.clientId;

      if (clientId) {
        await toast.promise(
          axios.patch(`/api/${params.clientId}/vehicle/${vehicleId}/washed`),
          {
            loading: "Terminando lavado...",
            success: <b>Vehículo lavado!</b>,
            error: <b>Algo salió mal...</b>,
          }
        );

        setWashingVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        );

        onChangeStatus(vehicleId);
      }
    } catch (error) {
      router.refresh();
    }
  };

  const onWashedMessage = async (vehicleData: any) => {
    try {
      const clientId = Array.isArray(params.clientId)
        ? params.clientId[0]
        : params.clientId;

      if (clientId) {
        await toast.promise(sendMessage(vehicleData, clientId), {
          loading: "Enviando mensaje...",
          success: <b>Mensaje enviado!</b>,
          error: <b>Algo salió mal...</b>,
        });

        setWashingVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.id !== vehicleData.id)
        );

        onChangeStatus(vehicleData.id);
      }
    } catch (error) {
      router.refresh();
    }
  };

  if (washingVehicles.length === 0) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <h3 className="font-semibold text-xl text-center">
          No hay vehículos lavándose...
        </h3>
      </div>
    );
  }

  return (
    <>
      <p className="text-lg my-7 px-3 lg:px-14">
        Vehículos en total:
        <span className="font-bold tracking-wider ml-2">
          {washingVehicles.length}
        </span>
      </p>
      <div className="px-3 lg:px-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-10 mt-7">
        {washingVehicles.map((item) => (
          <div
            className="rounded-lg w-full max-w-md opacity-80 shadow-md p-5 border border-gray-300"
            key={item.id}
          >
            <div className="flex justify-between items-center gap-x-3 mb-8">
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
              <div className="rounded-full h-4 w-4 border border-gray-400"></div>
            </div>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Ingreso:{" "}
              <span className="font-medium text-lg">{item.createdAt} hs</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Vehículo:{" "}
              <span className="font-medium text-lg">{item.vehicle}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Patente:{" "}
              <span className="font-medium text-lg">{item.licensePlate}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Color: <span className="font-medium text-lg">{item.color}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Marca: <span className="font-medium text-lg">{item.brand}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Tipo de lavado:{" "}
              <span className="font-medium text-lg">{item.typeOfCarWash}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Precio: <span className="font-medium text-lg">{item.price}</span>
            </h3>
            <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
              Teléfono:{" "}
              <span className="font-medium text-lg">{item.phoneNumber}</span>
            </h3>
            <h3 className="font-semibold text-xl mb-2 pb-0.5">
              Observaciones:{" "}
              <span className="font-medium text-lg">{item.observations}</span>
            </h3>
            <div className="flex flex-wrap mt-8 justify-center gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  router.push(`/${params.clientId}/proceso/${item.id}`)
                }
                className="w-full px-4 h-12 text-md font-bold bg-[#5ba3c7] text-white"
              >
                Modificar datos
                <ClipboardPenLine className="ml-2" height={20} width={20} />
              </Button>
              <Button
                type="button"
                className="w-full px-4 h-12 text-md font-bold bg-[#277fab] border text-white"
                onClick={() => onWashed(item.id)}
              >
                Finalizar lavado sin notificar
                <Droplets className="ml-2" height={20} width={20} />
              </Button>
              <Button
                type="button"
                className="w-full px-4 h-12 text-md font-bold"
                onClick={() => onWashedMessage(item)}
              >
                Finalizar lavado
                <Droplets className="ml-2" height={20} width={20} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WashingVehicles;
