import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  get isAdmin() {
    return get().user?.role === "admin";
  },
}));

export default useAuthStore;

//to ignore prop drilling
//manage user state
