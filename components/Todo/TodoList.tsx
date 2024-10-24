"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  task: string;
  completed: boolean;
  category: string;
};

// Add manual tasks here
const initialTasks: Task[] = [
  { id: 1, task: "Finish project report", completed: false, category: "Work" },
  { id: 2, task: "Buy groceries", completed: false, category: "Personal" },
  {
    id: 3,
    task: "Schedule doctor appointment",
    completed: false,
    category: "Urgent",
  },
  { id: 4, task: "Call mom", completed: true, category: "Personal" },
];

const DropIndicator = ({ beforeId }: { beforeId: number }) => {
  return (
    <div
      data-before-id={beforeId || "-1"}
      className="drop-indicator"
    ></div>
  );
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id: number) => {
    const response = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleCompletion = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !task.completed }),
    });
    if (response.ok) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const modifyTask = async (id: number, newTask: string) => {
    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: newTask }),
    });
    if (response.ok) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, task: newTask } : task
        )
      );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-[#2843ad]"; //blue color
      case "Personal":
        return "bg-[#03a4a1]"; //green color
      case "Urgent":
        return "bg-[#bc2e46]"; //red color
      default:
        return "bg-gray-500";
    }
  };

  const handleDragStart = (id: number) => {
    setDraggedTaskId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedTaskId === null) return;

    const draggedTask = tasks.find((task) => task.id === draggedTaskId);
    if (!draggedTask) return;

    const remainingTasks = tasks.filter((task) => task.id !== draggedTaskId);
    
    const targetIndex = remainingTasks.findIndex((task) => task.id === targetId);
    
    const updatedTasks = [
      ...remainingTasks.slice(0, targetIndex),
      draggedTask,
      ...remainingTasks.slice(targetIndex),
    ];

    setTasks(updatedTasks);
    setDraggedTaskId(null); 
  };

  return (
    <div className="relative space-y-3 mt-5 min-h-10">
      {tasks.length === 0 ? (
        <Card>
          <CardContent className="text-center">
            <CardHeader>
              <CardTitle className="text-[#39334d]">No Task</CardTitle>
            </CardHeader>
            <CardDescription>Add a task to get started</CardDescription>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <div key={task.id} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, task.id)}>
            <DropIndicator beforeId={task.id} />
            <div
              draggable="true"
              onDragStart={() => handleDragStart(task.id)}
            >
              <Card className="flex p-3 items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`h-4 w-4 rounded-full ${getCategoryColor(
                      task.category
                    )} mr-2`}
                  ></div>
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-[#39334d] text-md">
                      <span className={task.completed ? "line-through" : ""}>
                        {task.task}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </div>
                <div className="flex space-x-2">
                  <div
                    onClick={() => toggleCompletion(task.id)}
                    className="cursor-pointer"
                  >
                    {task.completed ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[#03a4a1]"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="hover:text-[#6e54b5] text-[#9638d1]"
                      />
                    )}
                  </div>
                  <div
                    onClick={() => {
                      const newTask = prompt("Modify your task:", task.task);
                      if (newTask) modifyTask(task.id, newTask);
                    }}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="hover:text-[#6e54b5] text-[#2843ad]"
                    />
                  </div>
                  <div
                    onClick={() => deleteTask(task.id)}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="hover:text-[#6e54b5] text-[#bc2e46]"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
