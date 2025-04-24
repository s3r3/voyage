// useGuestStore.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface GuestState {
  adults: number;
  children: number;
  rooms: number;
  increment: (type: 'adults' | 'children' | 'rooms') => void;
  decrement: (type: 'adults' | 'children' | 'rooms') => void;
  reset: () => void;
}

export const useGuestStore = create<GuestState>()(
  persist(
    (set) => ({
      adults: 1,
      children: 0,
      rooms: 1,
      increment: (type) => set((state) => ({ [type]: state[type] + 1 })),
      decrement: (type) => 
        set((state) => ({ 
          [type]: Math.max(
            type === 'adults' ? 1 : 0, 
            type === 'rooms' ? 1 : 0, 
            state[type] - 1
          )
        })),
      reset: () => set({ adults: 1, children: 0, rooms: 1 }),
    }),
    {
      name: 'guest-storage', // Nama untuk localStorage
    }
  )
);