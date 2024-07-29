import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";

const Questions = () => {
  return (
    <div>
      <h3 className="font-semibold block text-md text-[#000f17]">
        Preguntas frecuentes
      </h3>
      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="item-0">
          <AccordionTrigger className="text-sm">
            ¿Qué es una variable?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground mt-0.5">
            <p className="m-0">
              Una variable es como una caja con una etiqueta en la que podés
              guardar algo para usarlo después. Por ejemplo la variable
              "vehículos" guarda en una caja etiquetada con el mismo nombre,
              todos los tipos de vehículos que tu lavadero acepta. De esta
              manera podrás hacer del fomulario algo sencillo, rápido y fácil.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm text-start">
            ¿Cómo sería el resultado del mensaje predeterminado?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground mt-0.5">
            <p className="m-0">
              Tu auto patente "ABC-123" de color blanco, ya está listo para que
              lo retires!
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm">
            ¿Qué variables puedo poner?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground mt-0.5">
            <ul>
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'vehículo' : </span>
                Representa a las opciones de vehículos que vas a recibir dentro
                de tu lavadero.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'color' : </span>
                Representa al color del vehículo.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'patente' : </span>
                Representa la patente del vehículo recibido.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'marca' : </span>
                Representa la marca del vehículo recibido.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'precio' : </span>
                Representa el precio del lavado.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'tipo' : </span>
                Representa el tipo de lavado realizado.
              </li>
              <Separator className="my-2 w-4/5 mx-auto" />
              <li>
                <Dot height={20} width={20} className="text-black inline" />
                <span className="text-black">'ingreso' : </span>
                Representa la hora en la que el vehículo ingresó.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm text-start">
            ¿Por qué los mensajes no son 100% automáticos?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground mt-0.5">
            Porque cada conversación nueva en Whatsapp de manera 100% automática
            cuesta $0.06 dólares, equivalentes, junto a impuestos, a
            aproximádamente $120 pesos. Lo que, promediando los gastos, al mes
            costaría aproximádamente $57.000 pesos. En definitiva, para cuidar
            tu bolsillo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-sm text-start">
            ¿Qué hago si olvidé mi contraseña?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground mt-0.5">
            Si olvidaste tu contraseña deberías de contactar con soporte para
            poder reestablecerla.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Questions;
