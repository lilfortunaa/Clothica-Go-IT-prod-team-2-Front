import { create } from 'zustand';

type BasketItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type BasketState = {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (id: string) => void;
  clearBasket: () => void;
};

export const useBasketStore = create<BasketState>(set => ({
  items: [],
  addItem: item =>
    set(state => {
      const existing = state.items.find(
        i => i.id === item.id
      );
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: id =>
    set(state => ({
      items: state.items.filter(i => i.id !== id),
    })),
  clearBasket: () => set({ items: [] }),
}));
