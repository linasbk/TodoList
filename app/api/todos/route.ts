import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET: Fetch all tasks for the authenticated user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST: Add a new task
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    
    console.log("Session:", session);
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
        const { title, description, completed, category } = await req.json();
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                completed: completed || false,
                category,
                userId: parseInt(session?.user?.id || ""),
            },
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
  }
