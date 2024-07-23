import prismadb from "@/lib/prismadb";
import VehicleForm from "./components/vehicle-form";
import getConfigurations from "@/hooks/get-configurations";

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

  async function getConfigs() {
    const clientId = Array.isArray(params.clientId)
      ? params.clientId[0]
      : params.clientId;

    const configs = await getConfigurations(clientId);
    return configs;
  }

  getConfigs();

  return (
    <div className="flex-col mt-7 mb-24 md:mb-7">
      <div className="flex-1 space-y-4">
        <VehicleForm initialData={vehicle} configurations={configs} />
      </div>
    </div>
  );
};

export default VehiclePage;
