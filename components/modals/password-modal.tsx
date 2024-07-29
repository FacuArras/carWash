"use client";

import * as z from "zod";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  password: z
    .string({
      message:
        "Para poder habilitar la edición necesitamos que ingreses la contraseña.",
    })
    .min(5, {
      message: "La contraseña debe tener al menos 5 caracteres.",
    }),
});

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.get("/api/clients", {
        params: { password: values.password },
      });

      onConfirm();
      onClose();
    } catch (error) {
      toast.error("Contraseña incorrecta.");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Habilitar edición"
      description="Para habilitar la edición de este vehículo es necesario ingresar una contraseña."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor={field.name} className="mb-1">
                  Contraseña
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      id={field.name}
                      disabled={loading}
                      type={showPassword ? "text" : "password"}
                      placeholder="****"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-1.5 px-1.5"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="pt-4" />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button disabled={loading} type="submit">
              Habilitar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
