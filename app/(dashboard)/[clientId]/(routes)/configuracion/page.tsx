import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ConfigForm from "./components/config-form";

const Configuracion = () => {
  return (
    <div className="my-7">
      <Heading
        title="Configuración"
        description="Configuraciones para hacer tu experiencia más sencilla y rápida."
      />
      <Separator className="my-6" />
      <ConfigForm initialData={null} />
    </div>
  );
};

export default Configuracion;
