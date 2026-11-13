import { create } from 'zustand';

const useStore = create((set) => ({
  user: null, // { id, goal_type, xp, streak, starting_unit_id }
  setUser: (userData) => set({ user: userData }),
  addXp: (amount) => set((state) => ({ 
    user: state.user ? { ...state.user, xp: state.user.xp + amount } : null 
  })),
  setStreak: (streak) => set((state) => ({
    user: state.user ? { ...state.user, streak } : null
  })),
  logout: () => set({ user: null })
}));

export default useStore;
