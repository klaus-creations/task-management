"use client";

import React, { createContext, useContext, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTitle: string, newDescription: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

let taskIdCounter = 3;

const initialTasks: Task[] = [];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, description: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: taskIdCounter++,
        title,
        description,
        completed: false,
      },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, newTitle: string, newDescription: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleComplete, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
