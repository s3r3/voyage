// app/ui/landing/components/SearchForm.tsx
"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Input } from "../../../../components/ui/input"; // Adjust path as needed
import { Button } from "../../../../components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFlightStore } from "../../../store/dateFlight"; // Adjust path as needed
import GuestSelector from "../GuestSleector"; // Assuming GuestSelector is in the same directory or nearby
import { useGuestStore } from "../../../store/useGuestStore"; // Assuming you have a guest store

const FlightDateRangePicker = () => {
  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } =
    useFlightStore();

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

const SearchForm = () => {
    // You can add state for location here if needed,
    // or manage it in a Zustand store if shared elsewhere.
    // For now, let's assume location is local to this form or managed elsewhere.

    const handleSearch = () => {
        // Implement search logic here
        console.log("Searching...");
        // Access date state from useFlightStore
        // Access guest state from useGuestStore
        // Access location state (if managed here)
    }

  return (
    <div className="flex justify-center absolute   w-full max-w-[1200px]">
      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <Icon icon="tabler:building" className="w-6 h-6 text-[#07689F] mr-2" />
        <Input
          placeholder="Where are you going?"
          className="border-none focus:ring-0 text-sm"
          // Add value and onChange handlers if managing location state here
        />
      </div>

      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <FlightDateRangePicker />
      </div>

      <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
        <GuestSelector />
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

export default SearchForm;

