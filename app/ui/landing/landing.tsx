"use client";
import React from "react";
import Image from "next/image";
import SpecialOffers from "../landing/SpecialOffer";
import Explore from "./SectionExplore";
import banner1 from "public/banner1.png";
import SearchForm from "./components/SearchForm";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Navigation from "./components/Navigation";
const Landing = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <Navigation />
      <section className="pt-10 relative">
        <Image
          src="/banner.png"
          alt="Banner"
          width={1440}
          height={500}
          className="w-full h-auto"
        />
        <div className="bottom-[28px] left-1/2 transform -translate-x-1/2 absolute  w-full max-w-[1200px] flex justify-center"><SearchForm /></div>
        
      </section>

      <section className="px-4 pt-20">
        <SpecialOffers />
      </section>
      <section className="px-4 pt-10">
        <Explore />
      </section>
      <section className=" pt-10 ">
        <Image src={banner1} alt="banner bottom " className="h-[411px]" />
      </section>

      <section className="px-4 pt-10">
        <div className="flex flex-col w-[704px] px-10 gap-2">
          <h1 className="font-bold text-[#07689F] text-xl">
            Go Further With The Voyage App
          </h1>
          <p>
            Enjoy savings on chosen hotels and flights when you book through the
            Voyage website. Additionally, earn One Key Cash for every booking
            made through the app.
          </p>
          <p>Secured By Europe GTP</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
