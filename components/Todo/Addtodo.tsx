import React, { PureComponent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TodoList from "./TodoList";
export class AddTodo extends PureComponent {
  state = {
    tasks: [],
    newTask: "",
  };

  addTask = () => {
    const { newTask, tasks } = this.state;
    if (!newTask) return; // Prevent adding empty tasks

    const newTaskObj = {
      id: Date.now(), // Using timestamp as a unique ID
      task: newTask,
      completed: false,
    };

    this.setState({
      tasks: [...tasks, newTaskObj],
      newTask: "", // Clear the input
    });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTask: e.target.value });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div className="relative min-h-screen">
        <div
          className="p-20 text-white text-center relative"
          style={{
            backgroundImage: `url('/header.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex items-center justify-center flex-grow">
          <div className="absolute top-20 left-0 right-0 bottom-0 flex justify-center">
            <div className="relative p-8 h-full bg-white w-[80%] min-w-96 rounded shadow-2xl">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="absolute top-[-4em] transform -translate-x-2/5 w-32"
              />
              <div className="flex justify-between gap-3 items-center">
                <Input
                  id="todo"
                  type="text"
                  placeholder="Enter your Todo"
                  value={newTask}
                  onChange={this.handleInputChange}
                  className="p-2 border rounded w-full"
                />
                <Button
                  className="bg-[#6e54b5] hover:bg-[#7e74b8] text-white"
                  onClick={this.addTask}
                >
                  Add Todo
                </Button>
              </div>
              <TodoList tasks={tasks} setTasks={this.setState.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTodo;
