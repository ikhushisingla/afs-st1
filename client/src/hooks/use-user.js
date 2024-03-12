import { create } from "zustand";

const useUserState = create((set) => ({
  user: null,
  setUser: (arg) => set({ user:arg }),
}));

export default useUserState;