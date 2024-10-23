"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCircle, faCheckCircle, faCube } from "@fortawesome/free-solid-svg-icons"; 
// Define the Todo type
type Todo = {
  id: number;
  task: string;
  completed: boolean;
  category: string; // New property for category
};

function TodoList({ tasks, setTasks }: { tasks: Todo[]; setTasks: React.Dispatch<React.SetStateAction<Todo[]>>; }) {
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const modifyTask = (id: number, newTask: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, task: newTask } : task
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-500";
      case "Personal":
        return "bg-green-500";
      case "Urgent":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative space-y-3 mt-5 min-h-10">
      {tasks.length === 0 ? (
        <Card>
          <CardContent className="text-center">
            <CardHeader>
              <CardTitle className="text-[#39334d]">No Task</CardTitle>
            </CardHeader>
            <CardDescription>
              Add a task to get started
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="flex p-3 items-center justify-between">
            <div className="flex items-center">
              <div className={`h-4 w-4 rounded-full ${getCategoryColor(task.category)} mr-2`}></div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-[#39334d] text-md">
                  <span className={task.completed ? "line-through" : ""}>
                    {task.task}
                  </span>
                </CardTitle>
              </CardHeader>
            </div>
            <div className="flex space-x-2">
                <div onClick={() => toggleCompletion(task.id)} className="cursor-pointer">
                    {task.completed ? <FontAwesomeIcon icon={faCheckCircle} 
                     className="text-green-500" /> : <FontAwesomeIcon icon={faCube} className="text-blue-500" />}
                </div>
                <div onClick={() => {
                    const newTask = prompt("Modify your task:", task.task);
                    if (newTask) modifyTask(task.id, newTask);
                }} className="cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} className="text-[#2e54bc]" />
                </div>
                <div onClick={() => deleteTask(task.id)} className="cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} className="text-[#bc2e46]" />
                </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default TodoList;
