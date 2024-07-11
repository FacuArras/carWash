"use client";

import { useClientModal } from "@/hooks/use-client-modal";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useClientModal((state) => state.onOpen);
  const isOpen = useClientModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
