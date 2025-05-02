import { useState } from "react";
import { Icon } from "@iconify/react";
import LogoutButton from "../logout/logout-button";

const UserDropdown = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
      >
        <Icon icon="mdi:account-circle" className="text-3xl text-[#07689F]" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded p-4 z-50">
          <p className="text-sm text-gray-800 mb-2">{user.email}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
