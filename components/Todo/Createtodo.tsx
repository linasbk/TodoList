import React, { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreatetodoProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addTask: (taskData: { title: string; description: string; category: string; completed: boolean; }) => void;
    newTask: string;
    newDescription: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Createtodo: React.FC<CreatetodoProps> = ({
    isOpen,
    setIsOpen,
    addTask,
    newTask,
    newDescription,
    handleInputChange
}) => {
    const [category, setCategory] = useState<string>('School');
    const [completed, setCompleted] = useState<boolean>(false);

    const handleAddTask = () => {
        addTask({ title: newTask, description: newDescription, category, completed });
        setIsOpen(false); // Close the dialog after adding the task
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#6e54b5] hover:bg-[#7e74b8] text-white">
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-[#2b2738]'>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <Input
                            id="title"
                            name="newTask"
                            value={newTask}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            className="border-2 border-[#8e71e1] ring-0 focus:ring-0"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="newDescription"
                            value={newDescription}
                            onChange={handleInputChange}
                            className="border-[#8e71e1] ring-0 focus:ring-0 min-h-[100px] w-full rounded-md border-2  px-3 py-2 text-sm"
                            placeholder="Enter task description"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-[#8e71e1] text-white rounded-md p-2 border-2 border-[#8e71e1] ring-0 focus:ring-0"
                        >
                            <option value="School">School</option>
                            <option value="Work" >Work</option>
                            <option value="Sport" >Sport</option>
                            <option value="Activities">Activities</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="completed"
                            checked={completed}
                            onChange={() => setCompleted(!completed)}
                            className="mr-2"
                            
                        />
                        <label htmlFor="completed" >Mark as completed</label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleAddTask} className="bg-[#6e54b5] hover:bg-[#7e74b8] text-white">
                        
                        Add Task
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Createtodo;
