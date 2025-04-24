
import { create } from 'zustand';

interface FlightStore {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  resetDates: () => void;
}

export const useFlightStore = create<FlightStore>((set) => ({
  checkInDate: null,
  checkOutDate: null,
  setCheckInDate: (date) => set((state) => {
    if (date && state.checkOutDate && date > state.checkOutDate) {
      return { checkInDate: date, checkOutDate: null };
    }
    return { checkInDate: date };
  }),
  setCheckOutDate: (date) => set({ checkOutDate: date }),
  resetDates: () => set({ checkInDate: null, checkOutDate: null }),
}));