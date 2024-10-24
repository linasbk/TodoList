import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    signupSchema.parse(body);

    const { email, password, firstname, lastname } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        lastname,
        firstname,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error in Sign-Up API:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
