import { format } from "date-fns";
import { CarClient } from "./components/client";
import { CarColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { es } from "date-fns/locale";
import { formatter } from "@/lib/utils";
import Bubbles from "@/components/bubbles";
import { Heading } from "@/components/ui/heading";

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
    createdAt: format(item.createdAt, "dd/MM/yy HH:mm'hs'", { locale: es }),
    price: formatter.format(item.price),
    phoneNumber: item.phoneNumber,
    brand: item.brand,
    observations: item.observations ? item.observations : "Ninguna",
  }));

  return (
    <div className="mb-24 md:mb-7">
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Historial de vehículos lavados"
          description="Administra los vehículos que ya terminaron su proceso de lavado."
        />
      </div>
      <CarClient data={formattedData} />
    </div>
  );
};

export default InProcessPage;
