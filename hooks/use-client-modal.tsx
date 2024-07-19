import { create } from "zustand";

interface useClientModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useClientModal = create<useClientModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
