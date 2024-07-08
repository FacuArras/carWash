import { format } from "date-fns";
import { CarClient } from "./components/client";
import { CarColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { es } from "date-fns/locale";
import { formatter } from "@/lib/utils";

const InProcessPage = async ({ params }: { params: { storeId: string } }) => {
  const vehicles = await prismadb.vehicle.findMany({
    where: {
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
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <CarClient data={formattedData} />
      </div>
    </div>
  );
};

export default InProcessPage;
