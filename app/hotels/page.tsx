// app/hotels/page.tsx
import React from "react";
import Header from "app/ui/shared/Header";
import Navigation from "app/ui/landing/components/Navigation";
import SearchForm from "app/ui/landing/components/SearchForm";
import Image from "next/image";
import WorldMap from "app/ui/landing/hotels/WorldMap";
import SpecialOffers from "app/ui/landing/hotels/special";
const HotelsPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="p-4 px-25">
        <h1 className="font-bold text-xl text-[#07689F]">
          Where is your Next Dream Place?
        </h1>
        <p className="text-gray-500 text-sm">
          Find exclusive Genius rewards in every corner of the world!
        </p>
      </div>
      <div className="flex justify-center items-center pt-10 pb-10">
        <SearchForm />
      </div>
      <div className="relative pt-15 ">
        <Image
          src="/hotels.png"
          alt="Banner"
          width={1440}
          height={664}
          className="w-full h-[664px]"
        />
        <div className="absolute top-[12rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
          <h1 className="font-bold text-[40px] text-white">Why Choose Us</h1>
          <button className="bg-[#07689F] text-white px-4 py-2 rounded-md">
            Explore More
          </button>
        </div>
      </div>
      <div className="px-4 pt-10">
        <WorldMap />
      </div>
      <div className="px-4 pt-10">
        <SpecialOffers />
      </div>
    </div>
  );
};

export default HotelsPage;
