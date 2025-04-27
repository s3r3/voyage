// app/ui/landing/landing.tsx
"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFlightStore } from "@/app/store/dateFlight";
import GuestSelector from "../../ui/landing/GuestSleector"; // Perbaiki path import
import SpecialOffers from "./SpecialOffer";

const FlightDateRangePicker = () => {
  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } = useFlightStore();

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

const Landing = () => {
  return (
    <div className="container mx-auto">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Image src="/Asset2.png" alt="logo" width={50} height={50} className="w-10 h-10" />
          <Icon icon="ri:question-line" className="text-xl" />
          <Icon icon="emojione:flag-for-indonesia" className="text-xl" />
        </div>

        <div className="relative w-[605px]">
          <Input className="pl-10 pr-4 py-2 w-full" />
          <Icon
            icon="mynaui:search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="flex gap-4">
          <Button className="w-[189px] h-[40px] border border-[#07689F] text-[#07689F] hover:bg-[#07689F] hover:text-white transition-colors">
            Signin
          </Button>
          <Button className="w-[189px] h-[40px] border border-[#07689F] text-[#07689F] hover:bg-[#07689F] hover:text-white transition-colors">
            Register
          </Button>
        </div>
      </header>

      {/* Navigation Buttons */}
      <nav className="flex justify-center gap-2 py-4">
        {["Trip", "% Deals", "Hotel", "Flight", "Apartment", "Camper"].map((label, index) => (
          <button
            key={index}
            className="w-[121px] h-[40px] rounded-full border border-gray-300 opacity-75 hover:bg-[#07689F] hover:text-white hover:opacity-100 transition-colors"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Banner Section */}
      <section className="pt-10 relative">
        <Image src="/banner.png" alt="Banner" width={1440} height={500} className="w-full h-auto" />
        <div className="flex justify-center  absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 w-full max-w-[1200px]">
          <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
            <Icon icon="tabler:building" className="w-6 h-6 text-[#07689F] mr-2" />
            <Input placeholder="Where are you going?" className="border-none focus:ring-0 text-sm" />
          </div>

          <div className="flex items-center bg-white p-4 w-[327px] h-[56px]">
            <FlightDateRangePicker />
          </div>

          <div className="flex items-center bg-white  p-4 w-[327px] h-[56px]">
            <GuestSelector />
          </div>

          <Button className="w-[127px] h-[56px] bg-[#07689F] text-white rounded-none">
            Search
          </Button>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="px-4 pt-20">
        <SpecialOffers/>
      </section>
    </div>
  );
};

export default Landing;