import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "../../types/user.type";
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage<User>(() => AsyncStorage), // (optional) by default the 'localStorage' is use
    },
  ),
);
