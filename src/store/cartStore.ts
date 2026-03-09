import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    description?: string;
    category?: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    total: () => number;
    totalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (newItem) => {
        set((state) => {
            const existing = state.items.find((i) => i.id === newItem.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
    },

    removeItem: (id) => {
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        }));
    },

    updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
            get().removeItem(id);
            return;
        }
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, quantity } : i
            ),
        }));
    },

    clearCart: () => set({ items: [] }),

    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    total: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    totalItems: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
    },
}));
