import { create } from "zustand";

export type SearchQuery = {
    students: number;
    subject: string;
    price: number;
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({ query: query }),
    query: {
        students: 1,
        subject: '',
        price: 0
    }
}));

export default useSearchModal;