// app/hotels/page.tsx
import React from "react";
import Header from "app/ui/shared/Header";
import Navigation from "app/ui/landing/components/Navigation";
import Image from "next/image";
import WorldMap from "app/ui/landing/hotels/WorldMap";
import SpecialOffers from "app/ui/landing/hotels/special";
import comprasion1 from "public/comprasion1.jpg";
import comprasion2 from "public/comprasion2.jpg";
import SearchHotelForm from "app/ui/landing/components/SearchHotelForm";
import AvatarHotels from "app/ui/landing/hotels/avatar";
import Footer from "app/ui/shared/Footer";

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
        <SearchHotelForm />
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
      <div className="px-10 pt-10">
        <h1 className="font-bold text-2xl pb-4">Make a Comprasion </h1>
        <div className="w-full flex justify-between">
          <div className="relative w-[543px] h-[330px]">
            <Image
              src={comprasion1}
              alt="comparison1"
              className="object-cover w-full h-full"
              width={543}
              height={330}
            />
            <p className="absolute bottom-4 left-4 text-white w-[calc(100%-32px)] text-sm md:text-base font-bold">
              The past offers with the highest reviews outshine others, standing
              as a testament to their exceptional quality.
            </p>
          </div>
          <div className="relative w-[543px] h-[330px]">
            <Image
              src={comprasion2}
              alt="comparison2"
              className="object-cover w-full h-full"
              width={543}
              height={330}
            />
            <p className="absolute bottom-4 left-4 text-white w-[calc(100%-32px)] text-sm md:text-base font-bold">
              Ring in the new year with iconic moments and unforgettable
              memories in New York City
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10">
        
        <AvatarHotels/>
      </div>
      <div className="pt-[11rem]">
        <Footer/>
        </div>

    </div>
  );
};

export default HotelsPage;
