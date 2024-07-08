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
import { zodResolver } from "@hookform/resolvers/zod";
import { Vehicle } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface VehicleFormProps {
  initialData: Vehicle;
}

const formSchema = z.object({
  vehicle: z.string().min(1),
  licensePlate: z.string().min(1),
  color: z.string().min(1),
  phoneNumber: z.string().min(1),
  price: z.number().min(1),
  typeOfCarWash: z.string().min(1),
  observations: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof formSchema>;

const VehicleForm: React.FC<VehicleFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      observations: initialData.observations ?? undefined,
    },
  });

  const onSubmit = async (values: VehicleFormValues) => {
    function capitalizeFirstWord(word: string) {
      if (word.length === 0) return word;

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    try {
      setLoading(true);

      const valuesToSubmit = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
        color: capitalizeFirstWord(values.color),
      };

      await axios.patch(`/api/vehicleForm/${params.vehicleId}`, valuesToSubmit);

      toast.success("Vehículo actualizado!");
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
      window.location.href = `/proceso`;
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/vehicleForm/${params.vehicleId}`);

      router.refresh();
      router.push(`/proceso`);
      toast.success("Vehículo eliminado.");
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
      setOpen(false);
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
      <div className="flex items-center justify-between">
        <Heading title={"Modificá el vehículo ingresado"} description={""} />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 px-5 md:grid-cols-2 lg:px-0 lg:grid-cols-3 items-center justify-center gap-10 mb-10">
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehículo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná el tipo de vehículo a lavar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="auto">auto</SelectItem>
                      <SelectItem value="moto">moto</SelectItem>
                      <SelectItem value="camioneta">camioneta</SelectItem>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná el tipo de lavado a realizar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Motor">Motor</SelectItem>
                      <SelectItem value="Detalles">Detalles</SelectItem>
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
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto block">
            Modificar datos
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VehicleForm;
