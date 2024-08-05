"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";

interface MessageFormProps {
  messageConfiguration: string;
}

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Para actualizar el mensaje es necesario escribir uno...",
  }),
});

type MessageFormValues = z.infer<typeof formSchema>;

const MessageForm: React.FC<MessageFormProps> = ({ messageConfiguration }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: messageConfiguration },
  });

  const onSubmit = async (values: MessageFormValues) => {
    try {
      setLoading(true);

      await toast.promise(
        axios.patch(`/api/${params.clientId}/config`, values),
        {
          loading: "Actualizando mensaje...",
          success: <b>Mensaje actualizado!</b>,
          error: <b>Algo salió mal...</b>,
        }
      );

      location.reload();
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje automático</FormLabel>
                  <FormDescription className="pb-2">
                    Configurá el mensaje automático que se enviará al terminar
                    el lavado. Dentro del mismo existirán las variables
                    anteriormente creadas por vos. Para poder utilizarlas dentro
                    del mensaje tendrás que ponerlas dentro de comillas simples
                    (' '), te dejamos un mensaje predeterminado para que puedas
                    guiarte.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={
                        messageConfiguration
                          ? messageConfiguration
                          : "Tu 'vehículo' patente 'patente' de color 'color', ya está listo para que lo retires!"
                      }
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 ml-auto block">Actualizar mensaje</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default MessageForm;
