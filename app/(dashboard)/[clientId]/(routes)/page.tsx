"use client";

import EntryForm from "@/components/entry-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import getConfigurations from "@/hooks/get-configurations";
import { Configuration } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
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
        title="Formulario de ingreso"
        description="Completá el formulario con los datos del vehículo ingresante."
      />
      <Separator className="my-6" />
      <EntryForm configurations={configurations} />
    </div>
  );
};

export default Home;
