"use client";

import React, { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/context";
import { Check, Undo } from "lucide-react";
import UpdateTask from "./update-task";
import DeleteConfirmation from "./delete-task";

interface Task {
  id: string | number;
  title: string;
  completed: boolean;
  description: string;
}

const TaskList: FC = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((task: Task) => task.completed);
  const incompleteTasks = tasks.filter((task: Task) => !task.completed);

  return (
    <div className="space-y-8 mt-6">
      {/* Incomplete Tasks Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          To Do ({incompleteTasks.length})
        </h3>

        {incompleteTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-4 rounded-lg border border-dashed">
            No pending tasks. Add one to get started!
          </p>
        ) : (
          <div className="space-y-2">
            {incompleteTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TaskItem: FC<{ task: Task }> = ({ task }) => {
  const { toggleComplete } = useTasks();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center justify-between gap-3 p-3 rounded-lg border transition-all ${
        task.completed
          ? "bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/50"
          : "bg-background hover:bg-gray-50 dark:hover:bg-gray-900/50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <p
          className={`truncate ${
            task.completed
              ? "line-through font-bold text-base"
              : "text-foreground"
          }`}
        >
          {task.title}
        </p>

        <p
          className={`truncate ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.description}
        </p>
      </div>

      <div
        className={`flex gap-1 transition-opacity ${
          isHovered || task.completed ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          onClick={() => toggleComplete(Number(task.id))}
          className="text-muted-foreground hover:text-green-600 hover:bg-green-100/50 dark:hover:bg-green-900/20"
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {task.completed ? (
            <Undo className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>

        <UpdateTask task={task} />

        <DeleteConfirmation taskId={Number(task.id)} />
      </div>
    </div>
  );
};

export default TaskList;
