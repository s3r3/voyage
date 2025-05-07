import { create } from 'zustand';

interface HotelDateState {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  resetDates: () => void;
}

export const useHotelStore = create<HotelDateState>((set) => ({
  checkInDate: null,
  checkOutDate: null,
  setCheckInDate: (date) => set({ checkInDate: date, checkOutDate: null }), // Reset checkout when checkin changes
  setCheckOutDate: (date) => set({ checkOutDate: date }),
  resetDates: () => set({ checkInDate: null, checkOutDate: null }),
}));