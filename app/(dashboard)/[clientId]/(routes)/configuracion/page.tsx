import { Heading } from "@/components/ui/heading";
import VehicleForm from "./components/vehicle-form";
import TypesForm from "./components/type-form";
import MessageForm from "./components/message-form";
import Questions from "./components/questions";
import Bubbles from "@/components/bubbles";
import { Toaster } from "react-hot-toast";

const Configuracion = () => {
  return (
    <div className="mb-24 md:mb-7">
      <Toaster />
      <div className="canvas py-7 mb-7 px-3 lg:px-14 shadow">
        <Bubbles />
        <Heading
          title="Configuración"
          description="Configuraciones para hacer tu experiencia más sencilla y rápida."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:px-14 items-start justify-between gap-y-10 gap-x-6 lg:gap-10 mb-10">
        <VehicleForm />
        <TypesForm />
        <MessageForm />
        <Questions />
      </div>
    </div>
  );
};

export default Configuracion;
