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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useConfigurationsStore } from "@/store/configurations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Configuration, Vehicle } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface VehicleFormProps {
  initialData: Vehicle | null;
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
    .positive({
      message: "El precio no puede ser negativo.",
    }),
  typeOfCarWash: z.string().min(1, {
    message: "Tipo de lavado es obligatorio.",
  }),
  brand: z.string().min(1, {
    message: "Marca del vehículo es obligatoria.",
  }),
  observations: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof formSchema>;

const VehicleForm: React.FC<VehicleFormProps> = ({ initialData }) => {
  const [price, setPrice] = useState<number>(initialData!.price);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const configurations = useConfigurationsStore(
    (state) => state.currentConfiguration
  );

  const typeOfCarWash = configurations!.typeOfCarWash as Array<{
    type: string;
    price: number;
  }> | null;

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

  const handleTypeOfCarWashChange = (value: string) => {
    form.setValue("typeOfCarWash", value);
    const selected = typeOfCarWash?.find((item) => item.type === value);
    if (selected) {
      setPrice(selected.price);
      form.setValue("price", selected.price);
    } else {
      setPrice(8500);
      form.setValue("price", 8500);
    }
  };

  const onSubmit = async (values: VehicleFormValues) => {
    const hasChanges = Object.keys(values).some(
      (key) =>
        values[key as keyof VehicleFormValues] !==
        initialData?.[key as keyof VehicleFormValues]
    );

    if (!hasChanges) {
      toast.error(
        "Para modificar los datos tenés que modificar mínimo 1 campo."
      );
      return;
    }

    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
      };

      await toast.promise(
        axios.patch(
          `/api/${params.clientId}/vehicle/${params.vehicleId}`,
          valuesToSubmit
        ),
        {
          loading: "Modificando...",
          success: <b>Vehículo modificado!</b>,
          error: <b>Algo salió mal...</b>,
        }
      );
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
      window.location.href = `/${params.clientId}/proceso`;
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await toast.promise(
        axios.delete(`/api/${params.clientId}/vehicle/${params.vehicleId}`),
        {
          loading: "Eliminando...",
          success: <b>Vehículo eliminado!</b>,
          error: <b>Algo salió mal...</b>,
        }
      );
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
      setOpen(false);
      window.location.href = `/${params.clientId}/proceso`;
    }
  };

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
          <div className="grid grid-cols-1 px-3 lg:px-14 pt-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mb-10">
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono del cliente</FormLabel>
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
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patente del vehículo</FormLabel>
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color del vehículo</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Blanco" {...field} />
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
                  <FormControl>
                    <Select
                      name="typeOfCarWash"
                      onValueChange={handleTypeOfCarWashChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="typeOfCarWash">
                        <SelectValue placeholder="Seleccioná el tipo de lavado a realizar" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOfCarWash &&
                          typeOfCarWash.map((item) => (
                            <SelectItem key={item.type} value={item.type}>
                              {item.type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
          <div className="flex justify-end gap-x-3 mr-3 lg:mr-14">
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
    </>
  );
};

export default VehicleForm;
