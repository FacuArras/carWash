"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Configuration } from "@prisma/client";
import getConfigurations from "@/hooks/get-configurations";
import VehicleForm from "./components/vehicle-form";
import TypesForm from "./components/type-form";
import MessageForm from "./components/message-form";
import Questions from "./components/questions";

const Configuracion = () => {
  const params = useParams();
  const [configurations, setConfigurations] = useState<Configuration>({
    id: "",
    vehicle: [],
    typeOfCarWash: [],
    message: "",
    clientId: "",
  });

  async function getConfigs() {
    const clientId = Array.isArray(params.clientId)
      ? params.clientId[0]
      : params.clientId;

    const configs = await getConfigurations(clientId);
    setConfigurations(configs);
    return configs;
  }

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <div className="my-7">
      <Heading
        title="Configuración"
        description="Configuraciones para hacer tu experiencia más sencilla y rápida."
      />
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:px-0 items-start justify-between gap-y-10 gap-x-6 lg:gap-10 mb-10">
        <VehicleForm vehiclesConfiguration={configurations.vehicle} />
        <TypesForm typesOfCarWashConfiguration={configurations.typeOfCarWash} />
        <MessageForm messageConfiguration={configurations.message} />
        <Questions />
      </div>
    </div>
  );
};

export default Configuracion;
