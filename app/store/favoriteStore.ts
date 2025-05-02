import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteState = {
  favoritedStates: Record<number, boolean>;
  toggleFavorite: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favoritedStates: {},
      toggleFavorite: (id) =>
        set((state) => ({
          favoritedStates: {
            ...state.favoritedStates,
            [id]: !state.favoritedStates[id],
          },
        })),
    }),
    {
      name: 'favorite-storage', // Name for local storage
    }
  )
);