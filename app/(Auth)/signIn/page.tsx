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

const SignInPage = () => {
  return (
    <div className="flex items-center bg-[#554f69] justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 gap-2">
          <CardTitle className="text-[#2b2738] text-4xl">
            Sign <span className="text-[#6e54b5]">In</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Don't have an account?{" "}
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
              className="w-80 border-2 border-[#8e71e1]"
            />
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"
              className="w-80 border-2 border-[#8e71e1]"
            />
            <Button
              type="submit"
              className="w-full bg-[#6e54b5] hover:bg-[#7e74b8] text-white"
            >
              Sign In
            </Button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-[#8e71e1]" />
              <span className="mx-2 text-[#8e71e1]">Or login with</span>
              <hr className="flex-grow border-t border-[#8e71e1]" />
            </div>
            <div className="flex justify-around mt-2 gap-2">
              <Button className="p-5 w-full border-2 border-[#8e71e1] bg-white text-[#6e5da6] font-bold hover:bg-[#b8b1df77]">
                <Image src="/google.svg" alt="" width={20} height={20} />
                Google
              </Button>
              <Button className="p-5 w-full border-2 border-[#8e71e1] bg-white text-[#6e5da6] font-bold hover:bg-[#b8b1df77]">
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

export default SignInPage;
