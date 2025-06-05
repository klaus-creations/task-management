"use client";

import React, { useState, FC } from "react";
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
import { Pencil } from "lucide-react";

interface Task {
  id: string | number;
  title: string;
  completed: boolean;
  description: string;
}

const UpdateTask: FC<{ task: Task }> = ({ task }) => {
  const { updateTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [editValueTitle, setEditValueTitle] = useState(task.title);
  const [editValueDescription, setEditValueDescription] = useState(
    task.description
  );

  const handleUpdate = () => {
    const trimmedTitle = editValueTitle.trim();
    const trimmedDescription = editValueDescription.trim();

    if (trimmedTitle.length < 3) {
      toast.error("Title must be at least 3 characters.", {
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      return;
      return;
    }

    if (trimmedDescription.length < 10) {
      toast.error("Description must be at least 10 characters.", {
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      return;
      return;
    }

    updateTask(Number(task.id), trimmedTitle, trimmedDescription);
    toast.success("Task updated!");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-blue-600 hover:bg-blue-100/50 dark:hover:bg-blue-900/20"
          aria-label="Edit Task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Input
          value={editValueTitle}
          onChange={(e) => setEditValueTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          placeholder="Edit task title"
          aria-label="Task title"
        />

        <textarea
          value={editValueDescription}
          onChange={(e) => setEditValueDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          placeholder="Edit task title"
          aria-label="Task title"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm  dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full h-38 p-2 resize-none border-[1px] border-gray-600/[.4] rounded-md"
        ></textarea>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
