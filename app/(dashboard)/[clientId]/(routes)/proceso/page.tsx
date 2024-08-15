"use client";

import Bubbles from "@/components/bubbles";
import { Heading } from "@/components/ui/heading";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import WaitingVehicles from "./components/waitingVehicles";
import WashingVehicles from "./components/washingVehicles";
import { useParams } from "next/navigation";
import axios from "axios";
import { formatter } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import Loader from "@/components/ui/loader";

export type Vehicle = {
  id: string;
  vehicle: string;
  phoneNumber: string;
  price: number;
  licensePlate: string;
  color: string;
  typeOfCarWash: string;
  brand: string;
  createdAt: string;
  observations: string;
  status: string;
};

const InProcessPage = () => {
  const [selectedButton, setSelectedButton] = useState("waiting");
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const params = useParams();

  useEffect(() => {
    let isMounted = true;

    async function fetchVehicles() {
      try {
        const clientId = Array.isArray(params.clientId)
          ? params.clientId[0]
          : params.clientId;

        const waitingResponse = await axios.get(
          `/api/${clientId}/vehicle/notWashed`
        );

        if (isMounted) {
          const formattedData = waitingResponse.data.map((item: any) => ({
            id: item.id,
            vehicle: item.vehicle,
            phoneNumber: item.phoneNumber,
            price: formatter.format(item.price),
            licensePlate: item.licensePlate,
            color: item.color,
            typeOfCarWash: item.typeOfCarWash,
            brand: item.brand,
            createdAt: formatInTimeZone(
              item.createdAt,
              "America/Argentina/Cordoba",
              "HH:mm"
            ),
            status: item.status,
            observations: item.observations ? item.observations : "Ninguna",
          }));

          setVehicles(formattedData);
        }
      } catch (error) {
        console.error("Error fetching vehicles", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchVehicles();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleButtonSelect = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  const onChangeStatusToWashing = (vehicleId: string) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, status: "washing" } : vehicle
      )
    );
  };

  const onChangeStatusToWashed = (vehicleId: string) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, status: "washed" } : vehicle
      )
    );
  };

  const componentsMap: Record<string, JSX.Element> = {
    waiting: (
      <WaitingVehicles
        data={vehicles.filter((data) => data.status === "waiting")}
        onChangeStatus={onChangeStatusToWashing}
      />
    ),
    washing: (
      <WashingVehicles
        data={vehicles.filter((data) => data.status === "washing")}
        onChangeStatus={onChangeStatusToWashed}
      />
    ),
  };

  return (
    <div className="mb-24 md:mb-7">
      <Toaster />
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Vehículos en proceso"
          description="Administra los vehículos que están en proceso de lavado."
        />
      </div>
      <div className="text-lg mt-4 px-3 lg:px-14 flex justify-between items-center">
        <div
          className={`w-full border border-gray-200 flex justify-center rounded-tl-md rounded-bl-md ${
            selectedButton === "waiting" && "bg-[#006aa1] text-white"
          }`}
        >
          <Button
            variant={"ghost"}
            type="button"
            className="w-full"
            onClick={() => handleButtonSelect("waiting")}
          >
            En espera
          </Button>
        </div>

        <div
          className={`w-full border border-gray-200 flex justify-center rounded-tr-md rounded-br-md ${
            selectedButton === "washing" && "bg-[#006aa1] text-white"
          }`}
        >
          <Button
            variant={"ghost"}
            type="button"
            className="w-full"
            onClick={() => handleButtonSelect("washing")}
          >
            Lavando
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        componentsMap[selectedButton]
      )}
    </div>
  );
};

export default InProcessPage;
