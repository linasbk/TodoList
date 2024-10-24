"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const userSchema = z.object({
  firstname: z.string().min(1).max(20, "First name is too long"),
  lastname: z.string().min(1).max(20, "Last name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSignup = async () => {
    try {
      userSchema.parse({ email, password, firstname, lastname });
      setErrors({});
  
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });
  
      if (response.ok) {
        router.push("/signIn");
      } else {
        alert("Invalid credentials");
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.flatten().fieldErrors;
        const formattedErrors: { [key: string]: string } = {};
  
        for (const key in fieldErrors) {
          const errorsArray = fieldErrors[key];
          if (Array.isArray(errorsArray) && errorsArray.length > 0) {
            formattedErrors[key] = errorsArray[0];
          }
        }
  
        setErrors(formattedErrors);
      }
    }
  };
  
  

  return (
    <div className="flex items-center justify-center bg-[#554f69] min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 gap-2">
          <CardTitle className="text-[#2b2738] text-4xl">
            Sign <span className="text-[#6e54b5]">Up</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/signIn">
              <span className="text-[#6e54b5] underline">Sign in</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex space-x-4">
              <Input
                id="firstname"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
                className="border-2 border-[#8e71e1] ring-0 focus:ring-0"
              />
              <Input
                id="lastname"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
                className="border-2 border-[#8e71e1]"
                />
            </div>
            <div className="flex space-x-4">
              {errors.firstname && <span className="text-red-600">{errors.firstname}</span>}
              {errors.lastname && <span className="text-red-600">{errors.lastname}</span>}
            </div>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border-2 border-[#8e71e1]"
            />
            {errors.email && <span className="text-red-600">{errors.email}</span>}
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="border-2 border-[#8e71e1]"
            />
            {errors.password && <span className="text-red-600">{errors.password}</span>}
            <Input
              id="confirm-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm your Password"
              className="border-2 border-[#8e71e1]"
            />
            <Button
              type="button"
              onClick={handleSignup}
              className="w-full bg-[#6e54b5] hover:bg-[#7e74b8] text-white"
            >
              Sign Up
            </Button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-[#8e71e1]" />
              <span className="mx-2 text-[#8e71e1]">Or register with</span>
              <hr className="flex-grow border-t border-[#8e71e1]" />
            </div>
            <div className="flex justify-around mt-2 gap-2">
              <Button className="p-5 w-full border-2 border-[#8e71e1] bg-white text-[#6e5da6] font-bold hover:bg-[#b8b1df77]">
                <Image src="/google.svg" alt="" width={20} height={20} />
                Google
              </Button>
              <Button className="p-5 w-full border-2 border-[#8e71e1] bg-white text-[#6e5da6] font-bold hover:bg-[#b8b1df77] ">
                <Image src="/github.svg" alt="" width={20} height={20} />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
