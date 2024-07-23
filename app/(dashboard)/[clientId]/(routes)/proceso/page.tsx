import prismadb from "@/lib/prismadb";
import { formatInTimeZone } from "date-fns-tz";
import { CarClient } from "./components/client";
import { CarColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

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

  const formattedData: CarColumn[] = vehicles.map((item) => ({
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
    <div className="flex-col mt-7 mb-24 md:mb-7">
      <div className="flex-1 space-y-4">
        <CarClient data={formattedData} />
      </div>
    </div>
  );
};

export default InProcessPage;
