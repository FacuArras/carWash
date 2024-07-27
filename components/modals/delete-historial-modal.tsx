"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteHistorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteHistorialModal: React.FC<DeleteHistorialModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Eliminar vehículo del historial"
      description="Para tu seguridad, te contactamos con soporte para que elimine el vehículo por vos."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteHistorialModal;