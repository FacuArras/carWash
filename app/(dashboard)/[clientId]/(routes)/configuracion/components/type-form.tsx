"use client";

import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PlusIcon, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface TypesFormProps {
  typesOfCarWashConfiguration: { type: string; price: number }[] | null;
}

const formSchema = z.object({
  typeOfCarWash: z.string().min(1, {
    message: "Para crear una variable es necesario escribir una...",
  }),
  price: z
    .number({
      message: "El precio es obligatorio.",
    })
    .min(1, {
      message: "El precio es obligatorio.",
    })
    .positive({
      message: "El precio no puede ser negativo.",
    })
    .int({
      message: "No es necesario poner puntos.",
    }),
});

type TypesFormValues = z.infer<typeof formSchema>;

const TypesForm: React.FC<TypesFormProps> = ({
  typesOfCarWashConfiguration,
}) => {
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState<{ type: string; price: number }[]>([]);
  const params = useParams();
  const router = useRouter();

  const form = useForm<TypesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { typeOfCarWash: "", price: undefined },
  });

  useEffect(() => {
    if (typesOfCarWashConfiguration) {
      setTypes(typesOfCarWashConfiguration);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [typesOfCarWashConfiguration]);

  const onSubmit = async (values: TypesFormValues) => {
    try {
      setLoading(true);

      const newType = { type: values.typeOfCarWash, price: values.price };

      await toast.promise(
        axios.patch(`/api/${params.clientId}/config/typeOfCarWash`, {
          newType,
        }),
        {
          loading: "Creando tipo de lavado...",
          success: <b>Tipo de lavado creado!</b>,
          error: <b>Tipo de lavado ya existente.</b>,
        }
      );

      setTypes((prevTypes) => [...prevTypes, newType]);
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (type: string) => {
    try {
      setLoading(true);

      const updatedTypes = types.filter((t) => t.type !== type);

      await toast.promise(
        axios.delete(`/api/${params.clientId}/config/typeOfCarWash`, {
          data: { typeOfCarWash: type },
        }),
        {
          loading: "Eliminando tipo de lavado...",
          success: <b>Tipo de lavado eliminado!</b>,
          error: <b>Algo salió mal...</b>,
        }
      );

      setTypes(updatedTypes);
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="font-bold block text-lg text-[#000f17] font-nunito">
          Tipo de lavado
        </p>
        <p className="text-sm text-muted-foreground py-2">
          Creá las opciones de tipos de lavado que ofrezcas a tus clientes,
          agregando un nombre y un precio.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 items-center justify-between my-2"
          >
            <div className="flex-grow flex gap-2">
              <FormField
                control={form.control}
                name="typeOfCarWash"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Completo"
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
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="$12500"
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
            </div>

            <Button type="submit" className="max-w-20">
              <PlusIcon />
            </Button>
          </form>
        </Form>

        <div className="flex gap-x-2 gap-y-3 overflow-x-auto overflow-y-visible items-center scrollbar-hidden mt-2 lg:flex-wrap">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-full border px-2.5 py-0.5 w-14 h-5"
                />
              ))
            : types.map(({ type, price }) => (
                <Badge
                  variant="secondary"
                  key={type}
                  className="cursor-pointer h-fit min-w-fit group relative transition-all focus:pl-4 focus:py-2 focus:bg-[#004c73] focus:text-white"
                  tabIndex={0}
                >
                  {type} (${price})
                  <X
                    className="hidden group-focus:block ml-5"
                    width={20}
                    height={20}
                    onClick={() => onDelete(type)}
                  />
                </Badge>
              ))}
        </div>
      </div>
    </>
  );
};

export default TypesForm;
