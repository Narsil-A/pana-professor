import { create } from "zustand";

interface AddClassModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddClassModal = create<AddClassModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddClassModal;