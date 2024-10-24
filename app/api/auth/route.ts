// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error in Sign-Up API:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

