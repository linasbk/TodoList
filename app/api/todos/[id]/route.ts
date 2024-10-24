import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// PUT: Update a task
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const taskId = parseInt(params.id);
  
    // Verify that the task belongs to the authenticated user
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });
  
    if (!existingTask || existingTask.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
  
    try {
      const { title, description, completed, category } = await req.json();

      // Validate the category if necessary
      const validCategories = ["Work", "Personal", "Activities", "Sport"];
      if (category && !validCategories.includes(category)) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          title,
          description,
          completed,
          category,
        },
      });
      return NextResponse.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

// DELETE: Delete a task
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const taskId = parseInt(params.id);
  
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });
  
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  
    if (existingTask.userId !== parseInt(session.user.id || "")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
  
    try {
      await prisma.task.delete({
        where: { id: taskId },
      });
      return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
