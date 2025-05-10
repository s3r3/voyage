// app/ui/landing/components/GuestRoomSelector.tsx
"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/ui/components/ui/popover"; // Adjust path as needed
import { useGuestRoomStore } from "app/store/useGuestRoomStore"; // We will create this store

const GuestRoomSelector = () => {
  const {
    adults,
    children,
    infants,
    rooms,
    setAdults,
    setChildren,
    setInfants,
    setRooms,
  } = useGuestRoomStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleIncrement = (
    type: "adults" | "children" | "infants" | "rooms"
  ) => {
    if (type === "adults") setAdults(adults + 1);
    if (type === "children") setChildren(children + 1);
    if (type === "infants") setInfants(infants + 1);
    if (type === "rooms") setRooms(rooms + 1);
  };

  const handleDecrement = (
    type: "adults" | "children" | "infants" | "rooms"
  ) => {
    if (type === "adults" && adults > 1) setAdults(adults - 1);
    if (type === "children" && children > 0) setChildren(children - 1);
    if (type === "infants" && infants > 0) setInfants(infants - 1);
    if (type === "rooms" && rooms > 1) setRooms(rooms - 1);
  };

  const displayValue = `${
    adults + children + infants
  } Guest(s), ${rooms} Room(s)`;

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-2 rounded h-[56px] w-full justify-start text-gray-700 hover:bg-gray-100"
        >
          <Icon icon="tabler:users" className="w-6 h-6 text-[#07689F]" />
          <div className="flex flex-col items-start">
            <label className="text-xs font-medium text-gray-600">
              Guests & Rooms
            </label>
            <span className="text-sm font-medium">{displayValue}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Adults</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement("adults")}
                disabled={adults <= 1}
              >
                <Icon icon="tabler:minus" className="w-4 h-4" />
              </Button>
              <span>{adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement("adults")}
              >
                <Icon icon="tabler:plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Children (2-12)</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement("children")}
                disabled={children <= 0}
              >
                <Icon icon="tabler:minus" className="w-4 h-4" />
              </Button>
              <span>{children}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement("children")}
              >
                <Icon icon="tabler:plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Infants (&lt; 2)</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement("infants")}
                disabled={infants <= 0}
              >
                <Icon icon="tabler:minus" className="w-4 h-4" />
              </Button>
              <span>{infants}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement("infants")}
              >
                <Icon icon="tabler:plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Rooms</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrement("rooms")}
                disabled={rooms <= 1}
              >
                <Icon icon="tabler:minus" className="w-4 h-4" />
              </Button>
              <span>{rooms}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement("rooms")}
              >
                <Icon icon="tabler:plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestRoomSelector;
