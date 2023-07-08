import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IProducts {
  _id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  product_image: string;
  discount: number;
}

export interface CartItem {
  product: IProducts;
  quantity: number;
}

const persistOptions = {
  name: "cart-storage",
  getStorage: () => localStorage,
};

export const useCarts = create(
  persist(
    devtools((set, get: any) => ({
      items: [],
      add: ({ product, quantity }: CartItem) => {
        try {
          const items = get().items;
          if (items.length !== 0) {
            const found = items.find(
              (itemCart: CartItem) => itemCart.product?._id === product?._id
            );
            if (found) {
              found.quantity += quantity;
            } else {
              items.push({ product, quantity });
            }
          } else {
            items.push({ product, quantity });
          }
          return set({ items: [...items] }, false, { type: "cart/addToCart" });
        } catch (error) {
          console.error(error);
        }
      },
      updateQuantity: (id: string, newQuantity: number) => {
        const items = get().items;
        const found = items.find(
          (itemCart: CartItem) => itemCart.product?._id === id
        );
        if (found) {
          found.quantity = newQuantity;
        }
        return set({ items: [...items] }, false, {
          type: "cart/updateQuantity",
        });
      },
      remove: (id: string) => {
        const items = get().items;
        const newItems = items.filter(
          (itemCart: CartItem) => itemCart.product?._id !== id
        );
        return set({ items: [...newItems] }, false, {
          type: "cart/removeCart",
        });
      },
      removeAll: () => {
        return set({ items: [] }, false, { type: "cart/removeCartAll" });
      },
      increase: (id: string) => {
        const items = get().items;
        const found = items.find(
          (itemCart: CartItem) => itemCart.product?._id === id
        );
        if (found) {
          found.quantity++;
        }
        return set({ items: [...items] }, false, { type: "cart/increase" });
      },
      decrease: (id: string) => {
        const items = get().items;
        const found = items.find(
          (itemCart: CartItem) => itemCart.product?._id === id
        );
        if (found && found.quantity === 1) {
          const newItems = items.filter(
            (itemCart: CartItem) => itemCart.product?._id !== found.product?._id
          );
          return set({ items: [...newItems] }, false, {
            type: "cart/decrease",
          });
        } else if (found) {
          found.quantity--;
          return set({ items: [...items] }, false, { type: "cart/decrease" });
        }
      },
    })),
    persistOptions
  )
);
