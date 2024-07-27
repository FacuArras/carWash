"use client";

import * as z from "zod";
import { Modal } from "@/components/ui/modal";
import { useClientModal } from "@/hooks/use-client-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Para crear tu lavadero necesitamos un nombre.",
  }),
});

export const StoreModal = () => {
  const storeModal = useClientModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/clients", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Algo salió mal...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="¡Creá tu lavadero online ahora!"
      description=""
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="mb-1">Nombre</FormLabel>
                <FormDescription className="pb-2">
                  Con este nombre distinguiremos tu lavadero.
                </FormDescription>
                <FormControl>
                  <Input disabled={loading} placeholder="CarWash" {...field} />
                </FormControl>
                <FormMessage className="pt-4" />
              </FormItem>
            )}
          />
          <div className="space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">
              ¡Crear lavadero!
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
