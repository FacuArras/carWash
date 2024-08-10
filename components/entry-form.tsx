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
import toast from "react-hot-toast";
import { Configuration } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

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
    .positive({
      message: "El número de teléfono no puede ser negativo.",
    }),
  price: z
    .number()
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

interface EntryFormProps {
  configurations: Configuration;
}

const EntryForm: React.FC<EntryFormProps> = ({ configurations }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [valueCombobox, setValueCombobox] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
        phoneNumber: values.phoneNumber.toString(),
      };

      await toast.promise(
        axios.post(`/api/${params.clientId}/vehicle`, valuesToSubmit),
        {
          loading: "Creando...",
          success: <b>Vehículo registrado!</b>,
          error: <b>Algo salió mal...</b>,
        }
      );

      router.push(`/${params.clientId}/proceso`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-3 lg:px-14">
          <div className="grid grid-cols-1 px-3 md:grid-cols-2 lg:px-0 lg:grid-cols-3 items-center justify-center gap-6 lg:gap-10 mb-10">
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="vehicle">Vehículo</FormLabel>
                  <FormControl>
                    <Select
                      name="vehicle"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="vehicle">
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono del cliente</FormLabel>
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="color">Color del vehículo</FormLabel>
                  <FormControl>
                    <Select
                      name="color"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="color">
                        <SelectValue placeholder="Seleccioná el color del vehículo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"blanco"}>Blanco</SelectItem>
                        <SelectItem value={"negro"}>Negro</SelectItem>
                        <SelectItem value={"gris"}>Gris</SelectItem>
                        <SelectItem value={"azul"}>Azul</SelectItem>
                        <SelectItem value={"rojo"}>Rojo</SelectItem>
                        <SelectItem value={"verde"}>Verde</SelectItem>
                        <SelectItem value={"amarillo"}>Amarillo</SelectItem>
                        <SelectItem value={"celeste"}>Celeste</SelectItem>
                        <SelectItem value={"marrón"}>Marrón</SelectItem>
                        <SelectItem value={"naranja"}>Naranja</SelectItem>
                        <SelectItem value={"violeta"}>Violeta</SelectItem>
                        <SelectItem value={"rosa"}>Rosa</SelectItem>
                      </SelectContent>
                    </Select>
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
              name="typeOfCarWash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="typeOfCarWash">Tipo de lavado</FormLabel>
                  <FormControl>
                    <Select
                      name="typeOfCarWash"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="typeOfCarWash">
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
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Precio del lavado</FormLabel>
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
          <Button type="submit" className="ml-auto mr-3 block">
            Ingresar datos
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EntryForm;
