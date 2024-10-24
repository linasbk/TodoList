"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import TodoList from "./TodoList";
import Createtodo from "./Createtodo";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const AddTodo: React.FC = () => {
  const [newTask, setNewTask] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div
        className="p-20 text-white text-center relative"
        style={{
          backgroundImage: `url('/header.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex items-center justify-center flex-grow">
        <div className="absolute top-20 left-0 right-0 bottom-0 flex justify-center">
          <div className="relative p-8 bg-white w-[80%] min-w-96 rounded shadow-2xl">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="absolute top-[-4em] transform -translate-x-2/5 w-32"
            />
            <Button
              onClick={() => signOut()}
              className="absolute top-[-4em] transform right-0 w-32 bg-white hover:bg-[#c7c2e3] text-[#6e54b5]"
            >
              Sign Out
            </Button>
            <div className="flex justify-between gap-3 items-center">
              <Input
                id="todo"
                type="text"
                placeholder="Enter your Todo"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <Createtodo 
                isOpen={isDialogOpen}
                setIsOpen={setDialogOpen}
                newTask={newTask}
                setRefresh={setRefresh}
              />
            </div>
            <div className="p-3 overflow-auto max-h-[95%] mt-4">
              <TodoList refesh={refresh} setRefresh={setRefresh} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
