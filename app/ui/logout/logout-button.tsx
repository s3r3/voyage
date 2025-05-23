"use client";

import { logout } from "app/lib/auth";
import { Button } from "app/ui/components/ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}
