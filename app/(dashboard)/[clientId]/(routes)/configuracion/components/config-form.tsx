"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vehicle } from "@prisma/client";
import axios from "axios";
import { Dot, PlusIcon, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ConfigFormProps {
  initialData: Vehicle | null;
}

const formSchema = z.object({
  vehicle: z.string().min(1),
  typeOfCarWash: z.string().min(1),
});

type ConfigFormValues = z.infer<typeof formSchema>;

const ConfigForm: React.FC<ConfigFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          vehicle: "",
          typeOfCarWash: "",
        },
  });

  const onSubmit = async (values: ConfigFormValues) => {};

  const onDelete = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:px-0 items-start justify-between gap-y-10 gap-x-6 lg:gap-10 mb-10">
            <div>
              <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehículo</FormLabel>
                    <FormDescription className="pb-2">
                      Creá las opciones de vehículos para tu formulario
                    </FormDescription>
                    <div className="flex gap-2">
                      <FormControl className="flex-grow">
                        <Input
                          disabled={loading}
                          placeholder="Auto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button type="button" className="max-w-20">
                        <PlusIcon />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex mt-4 gap-x-2 gap-y-3 overflow-x-auto overflow-y-visible items-center scrollbar-hidden">
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Auto
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Moto
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Camioneta
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Camión
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="typeOfCarWash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de lavado</FormLabel>
                    <FormDescription className="pb-2">
                      Creá las opciones de tipos de lavado que ofrezcas a tus
                      clientes
                    </FormDescription>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Interior"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button type="button" className="max-w-20">
                        <PlusIcon />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex  mt-4 gap-x-2 gap-y-3 overflow-x-scroll overflow-y-visible items-center scrollbar-hidden">
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Completo
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Interior
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Solo exterior
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-2 hover:pr-12 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  Pulido
                  <X
                    className="hidden absolute top-1.5 right-1.5 group-hover:block"
                    width={20}
                    height={20}
                  />
                </Badge>
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="typeOfCarWash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje automático</FormLabel>
                    <FormDescription className="pb-2">
                      Configurá el mensaje automático que se enviará al terminar
                      el lavado. Dentro del mismo existirán las variables
                      anteriormente creadas por vos. Para poder utilizarlas
                      dentro del mensaje tendrás que ponerlas dentro de comillas
                      simples (' '), te dejamos un mensaje predeterminado para
                      que puedas guiarte.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Tu 'vehiculo' patente 'patente' de color 'color', ya está listo para que lo retires!"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-4 ml-auto block">Actualizar mensaje</Button>
            </div>
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
                      Una variable es como una caja con una etiqueta en la que
                      podés guardar algo para usarlo después. Por ejemplo la
                      variable "vehículos" guarda en una caja etiquetada con el
                      mismo nombre, todos los tipos de vehículos que tu lavadero
                      acepta. De esta manera podrás hacer del fomulario algo
                      sencillo, rápido y fácil.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm text-start">
                    ¿Cómo sería el resultado del mensaje predeterminado?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground mt-0.5">
                    <p className="m-0">
                      Tu auto patente "ABC-123" de color blanco, ya está listo
                      para que lo retires!
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
                        <Dot
                          height={20}
                          width={20}
                          className="text-black inline"
                        />
                        <span className="text-black">'vehiculo' : </span>
                        Representa a las opciones de vehículos que vas a recibir
                        dentro de tu lavadero.
                      </li>
                      <Separator className="my-2 w-4/5 mx-auto" />
                      <li>
                        <Dot
                          height={20}
                          width={20}
                          className="text-black inline"
                        />
                        <span className="text-black">'patente' : </span>
                        Representa la patente del vehículo recibido.
                      </li>
                      <Separator className="my-2 w-4/5 mx-auto" />
                      <li>
                        <Dot
                          height={20}
                          width={20}
                          className="text-black inline"
                        />
                        <span className="text-black">'precio' : </span>
                        Representa el precio del lavado.
                      </li>
                      <Separator className="my-2 w-4/5 mx-auto" />
                      <li>
                        <Dot
                          height={20}
                          width={20}
                          className="text-black inline"
                        />
                        <span className="text-black">'tipo' : </span>
                        Representa el tipo de lavado realizado.
                      </li>
                      <Separator className="my-2 w-4/5 mx-auto" />
                      <li>
                        <Dot
                          height={20}
                          width={20}
                          className="text-black inline"
                        />
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
                    Porque cada conversación nueva en Whatsapp de manera 100%
                    automática cuesta $0.06 dólares, equivalentes, junto a
                    impuestos, a aproximádamente $120 pesos. Lo que, promediando
                    los gastos, al mes costaría aproximádamente $57.000 pesos.
                    En definitiva, para cuidar tu bolsillo.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ConfigForm;
