import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ICustomer } from "../interfaces/ICustomers";

const persistOptions = {
  name: "user-storage",
  getStorage: () => localStorage,
};

export const useUser = create(
  persist(
    devtools((set, get: any) => ({
      users: {},
      addUser: (customer: ICustomer) => {
        const users = get().users;
        Object.assign(users, customer);
        return set((state) => ({ users: users }), false, {
          type: "addUser",
        });
      },
    })),
    persistOptions
  )
);
