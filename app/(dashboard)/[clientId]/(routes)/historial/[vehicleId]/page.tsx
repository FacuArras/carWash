import prismadb from "@/lib/prismadb";
import VehicleForm from "./components/vehicle-form";
import { Heading } from "@/components/ui/heading";
import Bubbles from "@/components/bubbles";
import { Toaster } from "react-hot-toast";

const VehiclePage = async ({
  params,
}: {
  params: { vehicleId: string; clientId: string };
}) => {
  const vehicle = await prismadb.vehicle.findUnique({
    where: {
      id: params.vehicleId,
    },
  });

  const configs = await prismadb.configuration.findUnique({
    where: {
      clientId: params.clientId,
    },
  });

  return (
    <div className="mb-24 md:mb-7">
      <Toaster />
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Detalles del vehíuclo ya lavado"
          description="Mirá los detalles del vehículo que ya lavaste, si tuviste algún error y querés modificarlo o eliminarlo acá podes hacerlo."
        />
      </div>
      <VehicleForm initialData={vehicle} />
    </div>
  );
};

export default VehiclePage;
