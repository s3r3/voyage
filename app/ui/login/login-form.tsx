"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection after login
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/app/lib/supabase";
import { useSession } from "@/app/lib/auth";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // Redirect to protected route
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login after logout
  };

  if (session) {
    return (
      <div className="text-center">
        <p>Welcome, {session.user.email}</p>
        <Button onClick={handleLogout} className="mt-4">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-15 w-full">
      <div className="flex gap-5 items-center justify-center w-[1064px] h-[713px] bg-[#efefef] rounded-xl">
        <div className="w-[416px] h-[609px] bg-black rounded-xl" />
        <div className="flex flex-col gap-3 w-[393px]">
          <h1 className="text-xl font-bold">Login</h1>
          <p>Login to access your account</p>
          <div className="flex flex-col gap-3">
            <LabelInput
              label="Email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabelInput
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <p className="text-blue-500 cursor-pointer">Forgot Password?</p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-5 pt-5">
            <Button
              className="bg-blue-500 w-full text-white"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
            <p className="text-center">or</p>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelInput({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        className="bg-white"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SocialIcons() {
  const icons = [
    { icon: "logos:facebook", alt: "Facebook" },
    { icon: "ic:baseline-apple", alt: "Apple" },
    { icon: "flat-color-icons:google", alt: "Google" },
  ];

  return (
    <div className="flex justify-center gap-5">
      {icons.map(({ icon, alt }) => (
        <div
          key={alt}
          className="w-[48px] h-[48px] bg-white rounded-md flex items-center justify-center cursor-pointer"
        >
          <Icon icon={icon} className="w-6 h-6" />
        </div>
      ))}
    </div>
  );
}
