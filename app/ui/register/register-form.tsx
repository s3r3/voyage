"use client";

import { useState } from "react";
import { Button } from "app/ui/components/ui/button";
import { Checkbox } from "app/ui/components/ui/checkbox";
import { Input } from "app/ui/components/ui/input";
import { Label } from "app/ui/components/ui/label";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: formData.FullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("Register response:", result);

      if (response.ok) {
        setSuccess(true);
        setFormData({
          FullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          router.push("/login"); // Navigate to the login page
        }, 2000);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-15 w-full">
      <div className="flex gap-5 items-center justify-center w-[1064px] h-[713px] bg-[#efefef] rounded-xl">
        <div className="w-[416px] h-[609px] bg-black rounded-xl" />
        <div className="flex flex-col gap-3 w-[393px]">
          <h1 className="text-xl font-bold">Register</h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <LabelInput
              label="Full Name"
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
            <LabelInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <LabelInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <LabelInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms">
                I agree to all the Terms and Privacy Policies
              </Label>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && (
              <p className="text-green-500 text-center">
                Registration successful! Check your email to confirm your
                account.
              </p>
            )}
            <Button
              type="submit"
              className="bg-blue-500 w-full text-white mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>
          <div className="flex flex-col items-center gap-5 pt-5">
            <p className="text-center">or</p>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ LabelInput: Input + Label reusable component
function LabelInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="bg-white"
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}

// ✅ Social login placeholder (Facebook, Google, Apple)
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
