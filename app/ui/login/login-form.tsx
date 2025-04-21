// Importing necessary modules and components
"use client";

// Importing React's state management hook
import { useState } from "react";

// Importing custom components for UI
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Importing Supabase library and authentication hooks
import { supabase } from "@/app/lib/supabase";
import { useSession } from "@/app/lib/auth";

// Importing Iconify React component
import { Icon } from "@iconify/react";

// Defining the LoginForm component
export default function LoginForm() {
  // Initializing state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();

  // Handling login functionality
  const handleLogin = async () => {
    // Set loading flag to true
    setLoading(true);
    // Reset error message
    setError("");

    // Attempting to log in with password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Check if there's an error
    if (error) {
      // Set error message
      setError(error.message);
    } else {
      // Login successful, show success message
      alert("Successfully logged in!");
    }

    // Set loading flag back to false
    setLoading(false);
  };

  // Handling logout functionality
  const handleLogout = async () => {
    // Sign out of Supabase
    await supabase.auth.signOut();
    // Show logout success message
    alert("Logged out successfully!");
  };

  // If user is already logged in, display welcome message and logout button
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  // If user is not logged in, display login form
  return (
    <div className="flex justify-center pt-15 w-full">
      <div className="flex gap-5 items-center justify-center w-[1064px] h-[713px] bg-[#efefef] rounded-xl">
        <div className="w-[416px] h-[609px] bg-black rounded-xl" />
        <div className="flex flex-col gap-3 w-[393px]">
          {/* Login form */}
          <h1 className="text-xl font-bold">Login</h1>
          <p>Login to access your account</p>
          <div className="flex flex-col gap-3">
            {/* Email input field */}
            <LabelInput
              label="Email"
              type="email"
              placeholder="Enter your Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            {/* Password input field */}
            <LabelInput
              label="Password"
              type="password"
              placeholder="Enter Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          {/* Remember me checkbox and forgot password link */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <p className="text-blue-400 cursor-pointer">Forgot Password?</p>
          </div>
          {/* Display error message if any */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Button to submit login form */}
          <div className="flex flex-col gap-5 pt-5">
            <Button
              className="bg-blue-500 w-full text-white"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
            <p className="text-center">or</p>
            {/* Social media login icons */}
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom LabelInput component to render input field with label
function LabelInput({ label, type, placeholder, onChange }: any) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        className="bg-white"
        onChange={onChange}
      />
    </div>
  );
}

// Custom SocialIcons component to render social media login icons
function SocialIcons() {
  // Defining social media icons array
  const icons = [
    { icon: "logos:facebook", alt: "Facebook" },
    { icon: "ic:baseline-apple", alt: "Apple" },
    { icon: "flat-color-icons:google", alt: "Google" },
  ];

  return (
    <div className="flex justify-center gap-5">
      {/* Rendering each social media icon */}
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
