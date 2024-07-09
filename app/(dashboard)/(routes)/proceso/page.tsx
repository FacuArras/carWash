import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { CarClient } from "./components/client";
import { CarColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const InProcessPage = async () => {
  const vehicles = await prismadb.vehicle.findMany({
    where: {
      washed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: CarColumn[] = vehicles.map((item) => ({
    id: item.id,
    vehicle: item.vehicle,
    phoneNumber: item.phoneNumber,
    price: formatter.format(item.price),
    licensePlate: item.licensePlate,
    color: item.color,
    typeOfCarWash: item.typeOfCarWash,
    createdAt: formatInTimeZone(
      item.createdAt,
      "America/Argentina/Cordoba",
      "HH:mm"
    ),
    observations: item.observations ? item.observations : "Ninguna",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-7">
        <CarClient data={formattedData} fullData={vehicles} />
      </div>
    </div>
  );
};

export default InProcessPage;
