import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => User | null;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
    }),
    {
      name: "user-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage<User>(() => AsyncStorage), // (optional) by default the 'localStorage' is use
    },
  ),
);
