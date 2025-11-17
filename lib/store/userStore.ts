import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { Order } from "@/types/order";

type UserStore = {
  user: User | null;
  orders: Order[];
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      loading: true,
      error: null,

      setUser: (user) => set({ user }),
      setOrders: (orders) => set({ orders }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearUser: () => {
  set({ user: null, orders: [], loading: true, error: null });
  localStorage.removeItem("user-storage");
},
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          useUserStore.setState({ loading: false });
        });
      },
    }
  )
);
