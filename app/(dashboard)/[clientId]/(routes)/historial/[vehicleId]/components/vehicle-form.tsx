"use client";

import PasswordModal from "@/components/modals/password-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Configuration, Vehicle } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AlertModal from "@/components/modals/alert-modal";

interface VehicleHistorialProps {
  initialData: Vehicle | null;
  configurations: Configuration | null;
}

const formSchema = z.object({
  vehicle: z.string().min(1, {
    message: "Vehículo es obligatorio.",
  }),
  licensePlate: z.string().min(1, {
    message: "Patente es obligatoria.",
  }),
  color: z.string().min(1, {
    message: "Color es obligatorio.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Número de teléfono es obligatorio.",
  }),
  price: z
    .number({
      message: "Precio es obligatorio.",
    })
    .min(1, {
      message: "Precio es obligatorio.",
    })
    .positive(),
  typeOfCarWash: z.string().min(1, {
    message: "Tipo de lavado es obligatorio.",
  }),
  brand: z.string().min(1, {
    message: "Marca del vehículo es obligatoria.",
  }),
  observations: z.string().optional(),
});

type VehicleHistorialValues = z.infer<typeof formSchema>;

const VehicleHistorial: React.FC<VehicleHistorialProps> = ({
  initialData,
  configurations,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNotEditable, setIsNotEditable] = useState(true);
  const router = useRouter();
  const params = useParams();

  const form = useForm<VehicleHistorialValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          observations: initialData.observations ?? undefined,
        }
      : {
          vehicle: "",
          licensePlate: "",
          color: "",
          phoneNumber: undefined,
          price: undefined,
          typeOfCarWash: "",
          brand: "",
          observations: "",
        },
  });

  const onSubmit = async (values: VehicleHistorialValues) => {
    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
      };

      const updatedValues: Record<string, any> = {};
      if (initialData!.vehicle !== valuesToSubmit.vehicle)
        updatedValues.vehicle = valuesToSubmit.vehicle;
      if (initialData!.licensePlate !== valuesToSubmit.licensePlate)
        updatedValues.licensePlate = valuesToSubmit.licensePlate;
      if (initialData!.color !== valuesToSubmit.color)
        updatedValues.color = valuesToSubmit.color;
      if (initialData!.phoneNumber !== valuesToSubmit.phoneNumber)
        updatedValues.phoneNumber = valuesToSubmit.phoneNumber;
      if (initialData!.price !== valuesToSubmit.price)
        updatedValues.price = valuesToSubmit.price;
      if (initialData!.typeOfCarWash !== valuesToSubmit.typeOfCarWash)
        updatedValues.typeOfCarWash = valuesToSubmit.typeOfCarWash;
      if (initialData!.brand !== valuesToSubmit.brand)
        updatedValues.brand = valuesToSubmit.brand;
      if (initialData!.observations !== valuesToSubmit.observations)
        updatedValues.observations = valuesToSubmit.observations;

      if (Object.keys(updatedValues).length === 0) {
        toast.error(
          "Para modificar los datos tenés que modificar mínimo 1 campo."
        );
        setLoading(false);
        return;
      }

      await axios.patch(
        `/api/${params.clientId}/vehicle/${params.vehicleId}`,
        valuesToSubmit
      );

      toast.success("Vehículo actualizado!");
      window.location.href = `/${params.clientId}/historial`;
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.clientId}/vehicle/${params.vehicleId}`);

      toast.success("Vehículo eliminado.");
      setIsAlertModalOpen(false);
      window.location.href = `/${params.clientId}/historial`;
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordConfirmation = async () => {
    setIsNotEditable(false);
  };

  const mapFieldName = (fieldName: string): string => {
    switch (fieldName) {
      case "price":
        return '"precio"';
      case "typeOfCarWash":
        return '"tipo de lavado"';
      case "vehicle":
        return '"vehículo"';
      case "licensePlate":
        return '"patente"';
      case "brand":
        return '"marca del vehículo"';
      case "observations":
        return '"observaciones"';
      case "phoneNumber":
        return '"teléfono"';
      default:
        return fieldName;
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={onPasswordConfirmation}
        loading={loading}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 px-3 pt-2 md:grid-cols-2 lg:px-14 lg:grid-cols-3 items-center justify-center gap-6 lg:gap-10 mb-10">
            <div>
              <p className="font-semibold block text-md text-[#000f17]">
                Ingreso
              </p>
              <p className="mt-2 h-10 w-full rounded-md border border-input px-3 py-2 text-md ring-offset-background">
                {initialData!.createdAt &&
                  format(
                    new Date(initialData!.createdAt),
                    "dd/MM/yy 'a las ' HH:mm'hs'",
                    {
                      locale: es,
                    }
                  )}
              </p>
            </div>
            <div>
              <p className="font-semibold block text-md text-[#000f17]">
                Egreso
              </p>
              <p className="mt-2 h-10 w-full rounded-md border border-input px-3 py-2 text-md ring-offset-background">
                {initialData!.washedAt &&
                  format(
                    new Date(initialData!.washedAt),
                    "dd/MM/yy 'a las ' HH:mm'hs'",
                    {
                      locale: es,
                    }
                  )}
              </p>
            </div>
            <div>
              <p className="font-semibold block text-md text-[#000f17]">
                ¿Este vehículo fue modificado?
              </p>
              <p className="mt-2 min-h-10 h-fit w-full rounded-md border border-input px-3 py-2 text-md ring-offset-background">
                {initialData && initialData.updatedValue
                  ? `Sí, fue modificado el 
                ${format(
                  new Date(initialData!.updatedAt),
                  "dd/MM/yy 'a las ' HH:mm'hs'",
                  { locale: es }
                )}
                , los campos modificados fueron: 
                ${
                  initialData!.updatedValue &&
                  typeof initialData!.updatedValue === "object"
                    ? Object.keys(
                        initialData!.updatedValue as Record<string, any>
                      )
                        .map((key) => mapFieldName(key))
                        .join(", ")
                    : "No hay campos modificados"
                }`
                  : "No, no fue modificado."}
              </p>
            </div>
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="vehicle">Vehículo</FormLabel>
                  <Select
                    name="vehicle"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isNotEditable}
                  >
                    <FormControl>
                      <SelectTrigger id="vehicle">
                        <SelectValue placeholder="Seleccioná el tipo de vehículo a lavar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {configurations!.vehicle.map((vehicle) => (
                        <SelectItem key={vehicle} value={vehicle}>
                          {vehicle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patente</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Patente del vehículo"
                      readOnly={isNotEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Rojo"
                      readOnly={isNotEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="3516795024"
                      readOnly={isNotEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca del vehículo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Volkswagen"
                      readOnly={isNotEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="5000"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      readOnly={isNotEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeOfCarWash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="typeOfCarWash">Tipo de lavado</FormLabel>
                  <Select
                    name="typeOfCarWash"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isNotEditable}
                  >
                    <FormControl>
                      <SelectTrigger id="typeOfCarWash">
                        <SelectValue placeholder="Seleccioná el tipo de lavado a realizar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {configurations!.typeOfCarWash.map((typeOfCarWash) => (
                        <SelectItem key={typeOfCarWash} value={typeOfCarWash}>
                          {typeOfCarWash}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Observaciones{" "}
                    <span className="text-muted-foreground text-md">
                      (opcional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      readOnly={isNotEditable}
                      placeholder={"..."}
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {isNotEditable ? (
            <div className="flex justify-end mr-3 lg:mr-14">
              <Button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Habilitar edición
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-x-3 mr-3 lg:mr-14">
              <Button
                variant="destructive"
                type="button"
                onClick={() => setIsAlertModalOpen(true)}
              >
                Eliminar Datos
              </Button>
              <Button>Modificar Datos</Button>
            </div>
          )}
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default VehicleHistorial;
