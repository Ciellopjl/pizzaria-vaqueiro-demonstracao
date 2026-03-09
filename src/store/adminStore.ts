import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pizzas as initialPizzas, Pizza } from '@/data/pizzas';
import { initialPromotions, Promotion } from '@/data/promotions';

export interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
    paymentMethod: string;
    changeFor?: string;
    observations?: string;
    status: 'pending' | 'preparing' | 'on_way' | 'delivered';
    createdAt: string;
}

interface AdminStore {
    pizzas: Pizza[];
    promotions: Promotion[];
    orders: Order[];

    // Menu Actions
    setPizzas: (pizzas: Pizza[]) => void;
    addPizza: (pizza: Pizza) => void;
    updatePizza: (pizza: Pizza) => void;
    deletePizza: (id: string) => void;

    // Promotion Actions
    setPromotions: (promotions: Promotion[]) => void;
    addPromotion: (promo: Promotion) => void;
    updatePromotion: (promo: Promotion) => void;
    deletePromotion: (id: string) => void;

    // Order Actions
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    deleteOrder: (orderId: string) => void;
}

export const useAdminStore = create<AdminStore>()(
    persist(
        (set) => ({
            pizzas: initialPizzas,
            promotions: initialPromotions,
            orders: [
                {
                    id: '1234',
                    customerName: 'João Silva',
                    customerPhone: '82 98888-7777',
                    address: 'Rua das Flores, 123, Centro, Batalha',
                    items: [{ name: 'Pizza Vaqueiro (M)', quantity: 1, price: 52.90 }],
                    total: 52.90,
                    paymentMethod: 'Pix',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                }
            ],

            // Menu Actions
            setPizzas: (pizzas) => set({ pizzas }),
            addPizza: (pizza) => set((state) => ({ pizzas: [pizza, ...state.pizzas] })),
            updatePizza: (pizza) => set((state) => ({
                pizzas: state.pizzas.map((p) => p.id === pizza.id ? pizza : p)
            })),
            deletePizza: (id) => set((state) => ({
                pizzas: state.pizzas.filter((p) => p.id !== id)
            })),

            // Promotion Actions
            setPromotions: (promotions) => set({ promotions }),
            addPromotion: (promo) => set((state) => ({ promotions: [promo, ...state.promotions] })),
            updatePromotion: (promo) => set((state) => ({
                promotions: state.promotions.map((p) => p.id === promo.id ? promo : p)
            })),
            deletePromotion: (id) => set((state) => ({
                promotions: state.promotions.filter((p) => p.id !== id)
            })),

            // Order Actions
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            updateOrderStatus: (orderId, status) => set((state) => ({
                orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o)
            })),
            deleteOrder: (orderId) => set((state) => ({
                orders: state.orders.filter((o) => o.id !== orderId)
            })),
        }),
        {
            name: 'admin-storage',
        }
    )
);
