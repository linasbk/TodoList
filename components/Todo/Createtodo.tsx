import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreatetodoProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setRefresh: (refresh: boolean) => void;
    newTask: string;
}

const Createtodo: React.FC<CreatetodoProps> = ({ isOpen, setIsOpen, setRefresh, newTask }) => {
    const [title, setTitle] = useState<string>(newTask);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('Personal');
    const [backendError, setBackendError] = useState<string | null>(null);
    
    useEffect(() => {
        setTitle(newTask);
    }, [isOpen, newTask]);

    const handleAddTask = async () => {
        setBackendError(null);
        if (!title.trim()) {
            setBackendError('Title is required');
            return;
        }

        const taskData = { title, description, category, completed: false };

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setBackendError(errorData.error || 'Failed to add task');
                return;
            }
            setRefresh(true);
            setTitle('');
            setDescription('');
            setCategory('Personal');
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            setBackendError('Failed to add task');
        }
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
                    {backendError && <span className="text-red-600">{backendError}</span>}
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
