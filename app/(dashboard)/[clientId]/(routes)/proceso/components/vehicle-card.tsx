"use client";

import { sendMessage } from "@/actions/send-message";
import { Button } from "@/components/ui/button";
import { Circle, ClipboardPenLine, Droplets } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface VehicleCardProps {
  data?: {
    id: string;
    vehicle: string;
    phoneNumber: string;
    price: string;
    licensePlate: string;
    color: string;
    typeOfCarWash: string;
    brand: string;
    createdAt: string;
    observations: string;
    washed: boolean;
  }[];
}

const VehicleCard: React.FC<VehicleCardProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const onWashed = async (data: any) => {
    try {
      const clientId = Array.isArray(params.clientId)
        ? params.clientId[0]
        : params.clientId;

      if (clientId) {
        await toast.promise(sendMessage(data, clientId), {
          loading: "Enviando...",
          success: <b>Mensaje enviado!</b>,
          error: <b>Algo salió mal...</b>,
        });

        router.refresh();
      }
    } catch (error) {
      router.refresh();
    }
  };

  return (
    <>
      {data ? (
        <div className="px-3 lg:px-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10 mt-7">
          {data.map((data) => (
            <div
              className="rounded-lg w-full max-w-md opacity-80 shadow-lg p-5 border border-[#197aaa2a]"
              key={data.id}
            >
              <div className="flex justify-between items-center gap-x-3 mb-8">
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                <div className="rounded-full h-4 w-4 border border-gray-300"></div>
              </div>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Ingreso:{" "}
                <span className="font-medium text-lg">{data.createdAt} hs</span>
              </h3>
              <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
                Vehículo:{" "}
                <span className="font-medium text-lg">{data.vehicle}</span>
              </h3>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Patente:{" "}
                <span className="font-medium text-lg">{data.licensePlate}</span>
              </h3>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Color: <span className="font-medium text-lg">{data.color}</span>
              </h3>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Marca: <span className="font-medium text-lg">{data.brand}</span>
              </h3>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Precio:{" "}
                <span className="font-medium text-lg">{data.price}</span>
              </h3>
              <h3 className="font-semibold text-xl  border-b mb-2 pb-0.5">
                Teléfono:{" "}
                <span className="font-medium text-lg">{data.phoneNumber}</span>
              </h3>
              <h3 className="font-semibold text-xl border-b mb-2 pb-0.5">
                Observaciones:{" "}
                <span className="font-medium text-lg">{data.observations}</span>
              </h3>
              <div className="flex mt-8 justify-end gap-x-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    router.push(`/${params.clientId}/proceso/${data.id}`)
                  }
                  className="w-fit px-4 text-md font-bold"
                >
                  Modificar datos
                  <ClipboardPenLine className="ml-2" height={20} width={20} />
                </Button>
                <Button
                  type="button"
                  onClick={() => onWashed(data)}
                  className="w-fit px-4 text-md font-bold"
                >
                  Lavado!
                  <Droplets className="ml-2" height={20} width={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" h-96 w-full flex justify-center items-center">
          <h3 className="font-semibold text-xl text-center">
            No hay vehículos en proceso...
          </h3>
        </div>
      )}
      ;
    </>
  );
};

export default VehicleCard;
