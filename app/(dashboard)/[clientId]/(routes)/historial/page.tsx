import { format } from "date-fns";
import { CarClient } from "./components/client";
import { CarColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { es } from "date-fns/locale";
import { formatter } from "@/lib/utils";

const InProcessPage = async ({ params }: { params: { clientId: string } }) => {
  const vehicles = await prismadb.vehicle.findMany({
    where: {
      clientId: params.clientId,
      washed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: CarColumn[] = vehicles.map((item) => ({
    id: item.id,
    licensePlate: item.licensePlate,
    color: item.color,
    typeOfCarWash: item.typeOfCarWash,
    createdAt: format(item.createdAt, "yyyy do MMM, HH:mm", { locale: es }),
    price: formatter.format(item.price),
    phoneNumber: item.phoneNumber,
    observations: item.observations ? item.observations : "Ninguna",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-7">
        <CarClient data={formattedData} />
      </div>
    </div>
  );
};

export default InProcessPage;
