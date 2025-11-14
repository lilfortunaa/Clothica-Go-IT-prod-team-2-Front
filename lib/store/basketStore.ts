import { create } from 'zustand';

export type BasketItem = {
  _id: string;
  name: string;
  price: { value: number; currency: string };
  image?: string;
  size?: string;
  quantity: number;
  description?: string;
};

type BasketState = {
  items: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  addTestItems: () => void;
};

export const useBasketStore = create<BasketState>(
  (set, get) => ({
    items: [],

    addToBasket: item => {
      set(state => {
        const exists = state.items.find(
          i => i._id === item._id
        );
        if (exists) {
          return {
            items: state.items.map(i =>
              i._id === item._id
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
                  }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      });
    },

    removeFromBasket: id =>
      set(state => ({
        items: state.items.filter(i => i._id !== id),
      })),

    clearBasket: () => set({ items: [] }),

    updateQuantity: (id, quantity) =>
      set(state => ({
        items: state.items.map(i =>
          i._id === id ? { ...i, quantity } : i
        ),
      })),

    getTotalPrice: () =>
      get().items.reduce(
        (sum, item) =>
          sum + item.price.value * item.quantity,
        0
      ),

    addTestItems: () => {
      set({
        items: [
          {
            _id: '6877b9f116ae59c7b60d0135',
            name: "Сукня Office Chic Navy'",
            price: { value: 2599, currency: 'грн' },
            image:
              'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0135.webp',
            quantity: 1,
            size: 'M',
            description:
              'Office Chic Navy — елегантна офісна сукня...',
          },
          {
            _id: '6877b9f116ae59c7b60d0136',
            name: 'Сукня Evening Red',
            price: { value: 3499, currency: 'грн' },
            image:
              'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0136.webp',
            quantity: 2,
            size: 'L',
            description:
              'Evening Red — розкішна вечірня сукня...',
          },
        ],
      });
    },
  })
);
