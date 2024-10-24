export interface Task {
    id: number;
    title: string;
    description?: string | null;
    completed: boolean;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }