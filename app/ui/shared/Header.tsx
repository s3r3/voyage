// app/ui/shared/Header.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Input } from "../../../components/ui/input"; // Adjust path
import { Button } from "../../../components/ui/button"; // Adjust path
import Link from "next/link";
import { useSession } from "app/lib/auth"; // Adjust path
import UserDropdown from "../landing/userDropdown"; // Adjust path

const Header = () => {
  const { session, user } = useSession();

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Image
          src="/Asset2.png"
          alt="logo"
          width={50}
          height={50}
          className="w-10 h-10"
        />
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
        {!session || !user ? (
          <>
            <Link href="/register">
              <Button className="w-[189px] h-[40px] border border-[#07689F] text-[#07689F] hover:bg-[#07689F] hover:text-white transition-colors">
                Signin
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-[189px] h-[40px] border border-[#07689F] text-[#07689F] hover:bg-[#07689F] hover:text-white transition-colors">
                LogIn
              </Button>
            </Link>
          </>
        ) : (
          <UserDropdown user={user} />
        )}
      </div>
    </header>
  );
};

export default Header;