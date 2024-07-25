"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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

interface VehicleFormProps {
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

type VehicleFormValues = z.infer<typeof formSchema>;

const VehicleForm: React.FC<VehicleFormProps> = ({
  initialData,
  configurations,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<VehicleFormValues>({
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

  const onSubmit = async (values: VehicleFormValues) => {
    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
      };

      await axios.patch(
        `/api/${params.clientId}/vehicle/${params.vehicleId}`,
        valuesToSubmit
      );

      toast.success("Vehículo actualizado!");
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
      window.location.href = `/${params.clientId}/historial`;
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.clientId}/vehicle/${params.vehicleId}`);

      toast.success("Vehículo eliminado.");
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
      setOpen(false);
      window.location.href = `/${params.clientId}/historial`;
    }
  };

  const isDifferenceMoreThan10Minutes = (
    createdAt: Date | null,
    updatedAt: Date | null
  ) => {
    const differenceInMillis = Math.abs(
      createdAt!.getTime() - updatedAt!.getTime()
    );
    const differenceInMinutes = differenceInMillis / (1000 * 60);
    return differenceInMinutes >= 10;
  };

  const isDifferenceMoreThan1Minute = (
    createdAt: Date | null,
    updatedAt: Date | null
  ) => {
    const differenceInMillis = Math.abs(
      createdAt!.getTime() - updatedAt!.getTime()
    );
    const differenceInMinutes = differenceInMillis / (1000 * 60);
    return differenceInMinutes >= 1;
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="pb-2">
        <Heading
          title={"Detalles del vehículo ya lavado"}
          description={
            "Mirá los detalles del vehículo que ya lavaste, si tuviste algún error y querés modificarlo o eliminarlo acá podes hacerlo."
          }
        />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 px-3 pt-2 md:grid-cols-2 lg:px-0 lg:grid-cols-3 items-center justify-center gap-6 lg:gap-10 mb-10">
            <div>
              <p className="font-semibold block text-md text-[#000f17]">
                Ingreso
                <span className="text-muted-foreground text-sm">
                  {" "}
                  (no modificable)
                </span>
              </p>
              <p className="mt-2 h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
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
                <span className="text-muted-foreground text-sm">
                  {" "}
                  (no modificable)
                </span>
              </p>
              <p className="mt-2 h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
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
                <span className="text-muted-foreground text-sm">
                  {" "}
                  (no modificable)
                </span>
              </p>
              <p className="mt-2 min-h-10 h-fit w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
                {initialData &&
                isDifferenceMoreThan10Minutes(
                  initialData.createdAt,
                  initialData.updatedAt
                )
                  ? isDifferenceMoreThan1Minute(
                      initialData!.updatedAt,
                      initialData!.washedAt
                    )
                    ? `Sí, fue modificado el ${format(
                        new Date(initialData!.updatedAt),
                        "dd/MM/yy 'a las ' HH:mm'hs'",
                        { locale: es }
                      )}`
                    : "No"
                  : "No"}
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
                    <Input disabled={loading} placeholder="Rojo" {...field} />
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
                    <span className="text-muted-foreground text-sm">
                      (opcional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={"..."}
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-x-3 mr-3">
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              className="w-fit px-4"
              onClick={() => setOpen(true)}
              type="button"
            >
              Eliminar vehículo
            </Button>
            <Button type="submit">Modificar datos</Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default VehicleForm;
