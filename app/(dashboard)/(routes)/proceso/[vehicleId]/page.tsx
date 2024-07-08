import prismadb from "@/lib/prismadb";
import VehicleForm from "./components/vehicle-form";

const VehiclePage = async ({ params }: { params: { vehicleId: string } }) => {
  const vehicle = await prismadb.vehicle.findUnique({
    where: {
      id: params.vehicleId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VehicleForm initialData={vehicle} />
      </div>
    </div>
  );
};

export default VehiclePage;
