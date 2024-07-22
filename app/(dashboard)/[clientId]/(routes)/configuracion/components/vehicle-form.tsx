"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PlusIcon, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";
import { Skeleton } from "@/components/ui/skeleton";

interface VehicleFormProps {
  vehiclesConfiguration: string[];
}

const formSchema = z.object({
  vehicle: z.string().min(1, {
    message: "Para crear una variable es necesario escribir una...",
  }),
});

type VehicleFormValues = z.infer<typeof formSchema>;

const VehicleForm: React.FC<VehicleFormProps> = ({ vehiclesConfiguration }) => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { vehicle: "" },
  });

  useEffect(() => {
    if (!vehiclesConfiguration) {
      setLoading(true);
    } else {
      setVehicles(vehiclesConfiguration);
      setLoading(false);
    }
  }, [vehiclesConfiguration]);

  const onSubmit = async (values: VehicleFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/${params.clientId}/config`, values);

      setVehicles((prevVehicles) => [...prevVehicles, values.vehicle]);

      toast.success("Variable creada!");
    } catch (error) {
      router.refresh();
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (data: string) => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.clientId}/config`, {
        data: { vehicle: data },
      });

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle !== data)
      );

      router.refresh();
      toast.success("Variable eliminada.");
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input disabled={loading} placeholder="Auto" {...field} />
                    </FormControl>
                    <Button type="submit" className="max-w-20">
                      <PlusIcon />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex gap-x-2 gap-y-3 overflow-x-auto overflow-y-visible items-center scrollbar-hidden">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-full border px-2.5 py-0.5 w-14 h-5"
                />
              ))
            : vehicles.map((vehicle) => (
                <Badge
                  variant="secondary"
                  key={vehicle}
                  className="cursor-pointer h-fit min-w-fit group relative transition-all hover:pl-4 hover:py-2 hover:bg-[#004c73] hover:text-white"
                >
                  {vehicle}
                  <X
                    className="hidden group-hover:block ml-5"
                    width={20}
                    height={20}
                    onClick={() => onDelete(vehicle)}
                  />
                </Badge>
              ))}
        </div>
      </div>
    </>
  );
};

export default VehicleForm;
