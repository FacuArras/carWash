"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
} from "./ui/select";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Configuration } from "@prisma/client";

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
  phoneNumber: z
    .number()
    .min(1, {
      message: "Número de teléfono es obligatorio.",
    })
    .positive(),
  price: z
    .number()
    .min(1, {
      message: "Precio es obligatorio.",
    })
    .positive(),
  typeOfCarWash: z.string().min(1, {
    message: "Tipo de lavado es obligatorio.",
  }),
  observations: z.string().optional(),
});

interface EntryFormProps {
  configurations: Configuration;
}

const EntryForm: React.FC<EntryFormProps> = ({ configurations }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle: "",
      licensePlate: "",
      color: "",
      phoneNumber: undefined,
      price: undefined,
      typeOfCarWash: "",
      observations: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
        phoneNumber: values.phoneNumber.toString(),
      };

      await axios.post(`/api/${params.clientId}/vehicle`, valuesToSubmit);

      router.push(`/${params.clientId}/proceso`);
      router.refresh();
      toast.success("Vehículo registrado!");
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 px-3 md:grid-cols-2 lg:px-0 lg:grid-cols-3 items-center justify-center gap-6 lg:gap-10 mb-10">
          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehículo</FormLabel>
                <FormControl>
                  <Select
                    name="vehicle"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná el tipo de vehículo a lavar" />
                    </SelectTrigger>
                    <SelectContent>
                      {configurations.vehicle.map((vehicle) => (
                        <SelectItem key={vehicle} value={vehicle}>
                          {vehicle}
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
                    type="number"
                    disabled={loading}
                    placeholder="3517895215"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? undefined : value);
                    }}
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
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? undefined : value);
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
                <FormLabel>Tipo de lavado</FormLabel>
                <FormControl>
                  <Select
                    name="typeOfCarWash"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná el tipo de lavado a realizar" />
                    </SelectTrigger>
                    <SelectContent>
                      {configurations.typeOfCarWash.map((typeOfCarWash) => (
                        <SelectItem key={typeOfCarWash} value={typeOfCarWash}>
                          {typeOfCarWash}
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
                  <Input disabled={loading} placeholder="..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="ml-auto mr-3 block">
          Ingresar datos
        </Button>
        <Toaster />
      </form>
    </Form>
  );
};

export default EntryForm;
