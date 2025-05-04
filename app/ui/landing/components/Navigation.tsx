// app/ui/landing/components/Navigation.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const navItems = [
    { label: "Trip", href: "/" },
    { label: "% Deals", href: "/deals" },
    { label: "Hotel", href: "/hotels" },
    { label: "Flight", href: "/flights" },
    { label: "Apartment", href: "/apartments" },
    { label: "Camper", href: "/campers" },
  ];

  return (
    <nav className="flex justify-center gap-2 py-4">
      {navItems.map((item, index) => {
        const isActive = item.href === pathname;
        const linkClasses = `w-[121px] h-[40px] rounded-full border border-gray-300 opacity-75 hover:bg-[#07689F] hover:text-white hover:opacity-100 transition-colors flex justify-center items-center ${
          isActive ? "bg-[#07689F] text-white opacity-100" : ""
        }`;
        return (
          <Link key={index} href={item.href} className={linkClasses}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
