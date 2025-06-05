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
import { Pencil } from "lucide-react";

export default function UpdateTask({ task }: { task: any }) {
  const { updateTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleUpdate = () => {
    if (editValue.trim().length < 3) {
      toast.error("Task must be at least 3 characters.");
      return;
    }
    updateTask(task.id, editValue.trim());
    toast.success("Task updated!");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-blue-600 hover:bg-blue-100/50 dark:hover:bg-blue-900/20"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
        />
        <DialogFooter>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
