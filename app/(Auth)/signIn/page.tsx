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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [backendError, setBackendError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignin = async (): Promise<void> => {
    setBackendError(null);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setBackendError(response.error);
    } else if (response?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#554f69]">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl text-[#2b2738]">
            Sign <span className="text-[#6e54b5]">In</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signUp">
              <span className="text-[#6e54b5] underline">Sign up</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 border-2 border-[#8e71e1]"
            />
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 border-2 border-[#8e71e1]"
            />
            {backendError && (
              <span className="text-red-600">{backendError}</span>
            )}
            <Button
              type="button"
              onClick={handleSignin}
              className="w-full bg-[#6e54b5] hover:bg-[#7e74b8] text-white"
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
