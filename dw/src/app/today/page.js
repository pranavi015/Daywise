"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { supabase } from "lib/supabase";
import DashboardLayout from "components/DashboardLayout";

export default function TodayPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Supabase
  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("scheduled_date", { ascending: true });

      if (error) {
        console.log("Error fetching tasks:", error);
      } else {
        setTasks(data || []);
      }
    }

    fetchTasks();
  }, []);

  // Toggle task completion (frontend only for now)
  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Progress calculations
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1">Today</h1>
          <p className="text-sm opacity-70">
            {totalTasks} tasks planned
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{completedCount} completed</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-sm opacity-60">
              No tasks scheduled for today.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-4 rounded-xl border bg-white"
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6 opacity-40" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    task.completed ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.task_name}
                </h3>

                <div className="flex gap-3 mt-1 text-xs opacity-70">
                  <span>{task.duration} min</span>
                  <span>
                    {task.type === "review" ? "Review" : "New"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="mt-10 text-center">
          <button className="px-6 py-3 rounded-lg bg-black text-white">
            Start Focus Session
          </button>
          <p className="mt-2 text-sm opacity-60">
            No planning. Just focus.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
