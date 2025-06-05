"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/lib/context";
import { toast } from "sonner";
import { Plus, Sparkles } from "lucide-react";

export default function CreateTask() {
  const { addTask } = useTasks();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = () => {
    if (newTitle.trim().length < 3) {
      toast.error("Title must be at least 3 characters.", {
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      return;
    }
    if (newDescription.trim().length < 5) {
      toast.error("Description must be at least 5 characters.", {
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      return;
    }

    addTask(newTitle.trim(), newDescription.trim());
    setNewTitle("");
    setNewDescription("");
    setIsOpen(false);
    toast.success("Task created successfully!", {
      position: "top-center",
      style: {
        background: "#dcfce7",
        color: "#166534",
        border: "1px solid #86efac",
      },
      icon: <Sparkles className="w-4 h-4 text-green-600" />,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="group relative">
          <span className="relative z-10 flex items-center gap-1">
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            Create Task
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent dark:from-purple-500/10" />
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        <div className="relative py-4 space-y-4">
          <Input
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <textarea
            placeholder="Task description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm  dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full h-38 p-2 resize-none border-[1px] border-gray-600/[.4] rounded-md"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          >
            {" "}
          </textarea>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddTask}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <span className="relative z-10">Add Task</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
