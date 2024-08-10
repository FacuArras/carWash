import prismadb from "@/lib/prismadb";
import { formatInTimeZone } from "date-fns-tz";
import { formatter } from "@/lib/utils";
import Bubbles from "@/components/bubbles";
import { Heading } from "@/components/ui/heading";
import VehicleCard from "./components/vehicle-card";
import { Toaster } from "react-hot-toast";

const InProcessPage = async ({ params }: { params: { clientId: string } }) => {
  const vehicles = await prismadb.vehicle.findMany({
    where: {
      clientId: params.clientId,
      washed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData = vehicles.map((item) => ({
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
    washed: item.washed,
    observations: item.observations ? item.observations : "Ninguna",
  }));

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
      <p className="text-lg mt-4 px-3 lg:px-14">
        Total en proceso:{" "}
        <span className="font-bold tracking-wider">
          ({formattedData.length})
        </span>
      </p>

      <VehicleCard data={formattedData} />
    </div>
  );
};

export default InProcessPage;
