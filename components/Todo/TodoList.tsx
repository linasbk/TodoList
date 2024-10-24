import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ModifyTask from "./Modifytask";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: string;
};

interface TodoListProps {
  refesh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ refesh, setRefresh }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [isModifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
    setRefresh(false);
  }, [refesh, setRefresh]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setRefresh(true);
  };

  const toggleCompletion = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setRefresh(true);
  };

  const modifyTask = async (
    id: number,
    updatedTask: {
      title: string;
      description: string;
      category: string;
      completed: boolean;
    }
  ) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setRefresh(true);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Work: "bg-[#2843ad]",
      Personal: "bg-[#03a4a1]",
      Activities: "bg-[#bc2e46]",
      Sport: "bg-[#d38416]",
    };
    return categoryColors[category] || "bg-gray-400";
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
    const targetIndex = remainingTasks.findIndex(
      (task) => task.id === targetId
    );

    const updatedTasks = [
      ...remainingTasks.slice(0, targetIndex),
      draggedTask,
      ...remainingTasks.slice(targetIndex),
    ];

    setTasks(updatedTasks);
    setDraggedTaskId(null);
  };

  return (
    <TooltipProvider>
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
            <div
              key={task.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task.id)}
            >
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
                          {task.title}
                        </span>
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <div className="flex space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() => toggleCompletion(task.id)}
                          className="cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={
                              task.completed ? faCheckCircle : faCircleXmark
                            }
                            className={
                              task.completed
                                ? "text-[#03a4a1]"
                                : "hover:text-[#6e54b5] text-[#9638d1]"
                            }
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {task.completed
                            ? "Mark as complete"
                            : "Mark as incomplete"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() => {
                            setCurrentTask(task);
                            setModifyDialogOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="hover:text-[#6e54b5] text-[#2843ad]"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit task</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() => deleteTask(task.id)}
                          className="cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="hover:text-[#6e54b5] text-[#bc2e46]"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete task</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </Card>
              </div>
            </div>
          ))
        )}
        {currentTask && (
          <ModifyTask
            isOpen={isModifyDialogOpen}
            setIsOpen={setModifyDialogOpen}
            task={currentTask}
            modifyTask={modifyTask}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default TodoList;
