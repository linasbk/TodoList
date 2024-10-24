import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ModifyTaskProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    task: { id: number; title: string; description: string; category: string; completed: boolean };
    modifyTask: (id: number, updatedTask: { title: string; description: string; category: string; completed: boolean }) => Promise<void>;
}

const ModifyTask: React.FC<ModifyTaskProps> = ({ isOpen, setIsOpen, task, modifyTask }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description);
    const [category, setCategory] = useState<string>(task.category);
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [backendError, setBackendError] = useState<string | null>(null);

    const handleModifyTask = async () => {
        if (!title.trim()) {
            setBackendError('Title is required');
            return;
        }
        const updatedTask = {
            title,
            description,
            category,
            completed,
        };
        await modifyTask(task.id, updatedTask);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-[#2b2738]'>Modify Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className="border-2 border-[#8e71e1] ring-0 focus:ring-0"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-[#8e71e1] ring-0 focus:ring-0 min-h-[100px] w-full rounded-md border-2 px-3 py-2 text-sm"
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
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Sport">Sport</option>
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
                        <label htmlFor="completed">Mark as completed</label>
                    </div>
                    {backendError && <span className="text-red-600">{backendError}</span>}
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleModifyTask} className="bg-[#6e54b5] hover:bg-[#7e74b8] text-white">
                        Modify Task
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModifyTask;
