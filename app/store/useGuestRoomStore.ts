// app/store/useGuestRoomStore.ts
import { create } from 'zustand';

interface GuestRoomState {
  adults: number;
  children: number;
  infants: number;
  // Anda perlu menambahkan 'guests' jika Anda ingin mengaksesnya secara langsung dari store state.
  // Jika 'guests' hanya dihitung dari adults + children + infants, Anda bisa menggunakan selector atau menghitungnya saat dibutuhkan.
  guests: number; // Tambahkan properti 'guests'
  rooms: number;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  setInfants: (count: number) => void;
  setRooms: (count: number) => void;
  // Anda juga bisa menambahkan action untuk menghitung guests jika Anda ingin menyimpannya di store
  // updateGuests: () => void;
}

export const useGuestRoomStore = create<GuestRoomState>((set, get) => ({ // Tambahkan 'get' untuk mengakses state saat ini
  adults: 1, // Default: minimum 1 adult
  children: 0,
  infants: 0,
  guests: 1, // Inisialisasi 'guests'
  rooms: 1,  // Default: minimum 1 room

  setAdults: (count) => set((state) => ({
      adults: count,
      // Perbarui 'guests' saat 'adults' berubah
      guests: count + state.children + state.infants,
  })),

  setChildren: (count) => set((state) => ({
      children: count,
      // Perbarui 'guests' saat 'children' berubah
      guests: state.adults + count + state.infants,
  })),

  setInfants: (count) => set((state) => ({
      infants: count,
      // Perbarui 'guests' saat 'infants' berubah
      guests: state.adults + state.children + count,
  })),

  setRooms: (count) => set({ rooms: count }),

  // Contoh action untuk memperbarui 'guests' jika Anda tidak ingin melakukannya di setiap setter
  // updateGuests: () => set((state) => ({ guests: state.adults + state.children + state.infants })),
}));