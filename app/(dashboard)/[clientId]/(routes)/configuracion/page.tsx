import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import VehicleForm from "./components/vehicle-form";
import TypesForm from "./components/type-form";
import MessageForm from "./components/message-form";
import Questions from "./components/questions";
import prismadb from "@/lib/prismadb";

const Configuracion = async ({ params }: { params: { clientId: string } }) => {
  const configs = await prismadb.configuration.findUnique({
    where: {
      clientId: params.clientId,
    },
  });

  return (
    <div className="mt-7 mb-24 md:mb-7">
      <Heading
        title="Configuración"
        description="Configuraciones para hacer tu experiencia más sencilla y rápida."
      />
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:px-0 items-start justify-between gap-y-10 gap-x-6 lg:gap-10 mb-10">
        <VehicleForm vehiclesConfiguration={configs!.vehicle} />
        <TypesForm typesOfCarWashConfiguration={configs!.typeOfCarWash} />
        <MessageForm messageConfiguration={configs!.message} />
        <Questions />
      </div>
    </div>
  );
};

export default Configuracion;
