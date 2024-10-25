# TODO List App

A simple yet powerful Drog and Drop TODO List application built with React and Next.js. This app allows users to manage their tasks efficiently by providing features like drag-and-drop prioritization, marking tasks as complete, and performing CRUD operations.

## Features

- **Create Tasks**: Easily add new tasks with a title, description, and category.
- **Read Tasks**: View all your tasks in a clean, organized layout.
- **Update Tasks**: Modify existing tasks to keep them up to date.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Drag-and-Drop**: Rearrange tasks based on priority by dragging and dropping them.
- **Mark as Complete**: Quickly mark tasks as completed with a single click.

## Technologies Used

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **Prisma**: For database management.
- **NextAuth**: For user authentication.
- **Axios**: For making HTTP requests.
- **TypeScript**: For type safety and better development experience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   npm install
   ```

2. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   DATABASE_URL=postgresql://postgres:password@db:5432/nextjs_db
   NEXTAUTH_SECRET=secret
   ```
3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

