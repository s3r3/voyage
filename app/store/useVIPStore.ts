import { create } from 'zustand';

interface VIPState {
  isVIP: boolean;
  setVIPStatus: (status: boolean) => void;
}

export const useVIPStore = create<VIPState>((set) => ({
  isVIP: false, // Default status is not VIP
  setVIPStatus: (status) => set({ isVIP: status }),
}));