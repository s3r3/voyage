
  "use client";

  import React from "react";
  import { Icon } from "@iconify/react";
  import { Input } from "../../../../components/ui/input"; // Adjust path as needed
  import { Button } from "../../../../components/ui/button";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { useHotelStore } from "app/store/dateHotel"; // Create a new store for hotel dates
  import GuestRoomSelector from "./GuestRoomSelector"; // Create a new component for guest and room selection

  import VIPSelector from "./VIPSelector"; // Create a new component for VIP selectio}}

import { useRouter } from 'next/navigation'; // Import useRouter
import { useGuestRoomStore } from "app/store/useGuestRoomStore"; // Import GuestRoomStore
import { useVIPStore } from "app/store/useVIPStore"; // Import VIPStore


const HotelDateRangePicker = () => {
  // ... HotelDateRangePicker code ...
{{
  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } =
    useHotelStore();

  return (
    <div className="flex items-center gap-2 p-2 rounded h-[56px]">
      <Icon icon="tabler:calendar" className="w-6 h-6 text-[#07689F]" />
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600">Check-in</label>
          <DatePicker
            selected={checkInDate}
            onChange={setCheckInDate}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            placeholderText="Select check-in"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="text-sm px-2 py-1 border-none focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600">Check-out</label>
          <DatePicker
            selected={checkOutDate}
            onChange={setCheckOutDate}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            placeholderText="Select check-out"
            dateFormat="dd/MM/yyyy"
            minDate={checkInDate || new Date()}
            className="text-sm px-2 py-1 border-none focus:outline-none w-full"
            disabled={!checkInDate}
          />
        </div>
      </div>
    </div>
  );
};
}}

const SearchHotelForm = () => {
    const router = useRouter(); // Initialize router
    // Tambahkan state lokal untuk input lokasi jika tidak menggunakan store global
    const [location, setLocation] = React.useState('');


    const handleSearch = () => {
        // Access date state from useHotelStore
        const { checkInDate, checkOutDate } = useHotelStore.getState();
        // Access guest and room state from useGuestRoomStore
        const { guests, rooms } = useGuestRoomStore.getState();
        // Access VIP state from useVIPStore
        const { isVIP } = useVIPStore.getState(); // Assuming VIP store has an 'isVIP' state

        // Ambil lokasi dari state lokal atau store global
        // const location = 'Gothenburg'; // Ganti dengan nilai input sesungguhnya

        // Persiapkan parameter pencarian
        const queryParams = new URLSearchParams({
            location: location,
            // Pastikan dikonversi ke string
        }).toString();

        // Arahkan ke halaman hasil pencarian
        router.push(`/search-results?${queryParams}`);
    }

  return (
    <div className="flex justify-center absolute w-full max-w-[1200px]">
      
      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <Icon icon="tabler:building" className="w-6 h-6 text-[#07689F] mr-2" />
        <Input
          placeholder="Where are you going?"
          className="border-none focus:ring-0 text-sm"
          value={location} // Bind value to state
          onChange={(e) => setLocation(e.target.value)} // Update state on change
        />
      </div>

      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <VIPSelector />
      </div>

      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <GuestRoomSelector />
      </div>

      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <HotelDateRangePicker />
      </div>

      <Button
        className="w-[127px] h-[56px] bg-[#07689F] text-white rounded-none"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchHotelForm;