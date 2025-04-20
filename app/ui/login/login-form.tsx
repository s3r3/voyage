'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/app/lib/supabase";// import supabase client
import { Icon } from "@iconify/react/dist/iconify.js";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect or show success message
      alert("Successfully logged in!");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-15 w-full">
      <div className="flex gap-5 items-center justify-center w-[1064px] h-[713px] bg-[#efefef] rounded-xl">
        <div className="w-[416px] h-[609px] bg-black rounded-xl" />
        <div className="flex flex-col gap-3 w-[393px]">
          <h1 className="text-xl font-bold">Login</h1>
          <p>Login to access your Easyset24 account</p>
          <div className="flex flex-col gap-3">
            <LabelInput label="Email" type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
            <LabelInput label="Password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <p className="text-blue-400 cursor-pointer">Forgot Password?</p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-5 pt-5">
            <Button className="bg-blue-500 w-full text-white" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </Button>
            <p className="text-center">or</p>
            <SocialIcons />
            <p className="text-center">
              Don't have an account? <span className="text-blue-400 cursor-pointer">Register!</span>
            </p>
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
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} className="bg-white" onChange={onChange} />
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
          className="w-[48px] h-[48px] bg-white rounded-md flex items-center justify-center"
        >
          <Icon icon={icon} className="w-6 h-6" />
        </div>
      ))}
    </div>
  );
}
