import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center gap-5 p-8">
        <Image
          src="/Asset2.png"
          alt="logo"
          width={50}
          height={50}
          className="w-10 h-10"
        />
        <Icon icon="ri:question-line" />
        <Icon icon="emojione:flag-for-indonesia" />
        <div className="flex items-center justify-center w-[605px] h-[32px]">
          <Input />
          <Icon icon="mynaui:search" className="relative right-8" />
        </div>
        <Button className="border-1 w-[189px] h-[40px] border-[#07689F] text-[#07689F]">
          <a href="#" className="signin">
            Signin
          </a>
        </Button>
        <Button className="border-1 w-[189px] h-[40px] border-[#07689F] text-[#07689F]">
          <a href="#" className="register">
            Register
          </a>
        </Button>
      </div>
      <div className="flex justify-center gap-2 pt-7">
        {[
          { label: "Trip", href: "#" },
          { label: "% Deals", href: "#" },
          { label: "Hotel", href: "#" },
          { label: "Flight", href: "#" },
          { label: "Apartment", href: "#" },
          { label: "Camper", href: "#" },
        ].map((item, index) => (
          <button
            key={index}
            className="w-[121px] h-[40px] rounded-full border-1 opacity-50 hover:bg-[#07689F] hover:opacity-100 hover:text-white"
          >
            <a href={item.href}>{item.label}</a>
          </button>
        ))}
      </div>
      <div className="pt-10 w-full h-auto">
        <Image
          src="/banner.png"
          alt="Banner"
          width={1440}
          height={500}
          className="w-full h-auto"
        />
        <div className="flex justify-center">
          <div className="flex justify-center items-center bg-white w-[397px] border-1">
            <Icon icon="tabler:building" className="w-8 h-8 text-[#07689F]" />
            <Input
              placeholder="Where are u going to"
              className="rounded-none border-none "
            />
          </div>
          <div className="flex justify-center items-center bg-white w-[397px] border-1">
            <Icon icon="tabler:building" className="w-8 h-8 text-[#07689F]" />
            <Input
              placeholder="checkin date"
              className="rounded-none border-none "
              type="date"
            />
          </div>
          <div className="flex justify-center items-center bg-white w-[397px] border-1">
            <Icon icon="tabler:building" className="w-8 h-8 text-[#07689F]" />
            <Input
              placeholder="Where are u going to"
              className="rounded-none border-none "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
