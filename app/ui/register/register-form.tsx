"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Clear form fields on success
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
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
            {/* First Name and Last Name */}
            <div className="flex gap-3">
              <LabelInput
                label="First Name"
                type="text"
                value={firstName}
                onChange={setFirstName}
                required
              />
              <LabelInput
                label="Last Name"
                type="text"
                value={lastName}
                onChange={setLastName}
                required
              />
            </div>

            {/* Email */}
            <LabelInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />

            {/* Password */}
            <LabelInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />

            {/* Confirm Password */}
            <LabelInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms">
                I agree to all the Terms and Privacy Policies
              </Label>
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && (
              <p className="text-green-500 text-center">
                Check your email to confirm your account!
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-blue-500 w-full text-white mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>

          {/* Social Login Section */}
          <div className="flex flex-col items-center gap-5 pt-5">
            <p className="text-center">or</p>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable LabelInput Component
function LabelInput({
  label,
  type,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white"
        required={required}
      />
    </div>
  );
}

// Social Icons Component
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
