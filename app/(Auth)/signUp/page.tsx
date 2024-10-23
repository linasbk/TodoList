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

const SignUp = async () => {
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
                placeholder="First Name"
                className="border-2 border-[#8e71e1] ring-0 focus:ring-0"
              />
              <Input
                id="lastname"
                type="text"
                placeholder="Last Name"
                className="border-2 border-[#8e71e1]"
              />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="border-2 border-[#8e71e1]"
            />
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"
              className="border-2 border-[#8e71e1]"
            />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your Password"
              className="border-2 border-[#8e71e1]"
            />
            <Button
              type="submit"
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
