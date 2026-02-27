"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "components/DashboardLayout";
import { supabase } from "lib/supabase";

export default function ProgressPage({ darkMode }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      setLoading(true);
      const { data, error } = await supabase
        .from("progress") // your table for user progress
        .select("*")
        .single(); // assuming one row per user

      if (error) {
        console.log("Failed to fetch progress:", error);
      } else if (data) {
        // Convert last_14_days JSON string to array if needed
        if (typeof data.last_14_days === "string") {
          data.last_14_days = JSON.parse(data.last_14_days);
        }
        setProgress(data);
      }
      setLoading(false);
    }

    fetchProgress();
  }, []);

  if (loading || !progress) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-8 px-6 text-center text-gray-500">
          Loading progress...
        </div>
      </DashboardLayout>
    );
  }

  // Convert total minutes to hours and minutes
  const totalTimeHours = Math.floor(progress.total_time_minutes / 60);
  const totalTimeMinutes = progress.total_time_minutes % 60;
  const thisWeekHours = Math.floor(progress.week_time_minutes / 60);

  return (
    <DashboardLayout>
      <div
        className={`max-w-4xl mx-auto py-8 px-6 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
          }`}
      >
        {/* Header */}
        <div className="mb-12">
          <h2 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Progress
          </h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Small steps, done daily.
          </p>
        </div>

        {/* Hero Metric - Streak */}
        <div className="mb-12 text-center">
          <div className="text-7xl mb-4">🔥</div>
          <div className={`text-5xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {progress.streak}-day streak
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Time Learned */}
          <div
            className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
          >
            <div className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Total time learned
            </div>
            <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {totalTimeHours}h {totalTimeMinutes}m
            </div>
          </div>

          {/* Days Active */}
          <div
            className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
          >
            <div className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Days active
            </div>
            <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {progress.days_active} / {progress.total_days}
            </div>
          </div>

          {/* Topics Completed */}
          <div
            className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
          >
            <div className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Topics completed
            </div>
            <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {progress.topics_completed} / {progress.total_topics}
            </div>
          </div>
        </div>

        {/* This Week Snapshot */}
        <div
          className={`p-6 rounded-xl border mb-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            This week
          </h3>
          <div className="flex gap-8">
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Days active
              </div>
              <div className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {progress.week_days_active} days
              </div>
            </div>
            <div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Time learned
              </div>
              <div className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {thisWeekHours}h
              </div>
            </div>
          </div>
        </div>

        {/* Activity Dots (Last 14 Days) */}
        <div
          className={`p-6 rounded-xl border mb-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Last 14 days
          </h3>
          <div className="flex gap-2 justify-center">
            {progress.last_14_days.map((active, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${active ? "bg-blue-500" : darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                title={active ? "Active" : "Inactive"}
              />
            ))}
          </div>
        </div>

        {/* Encouraging Microcopy */}
        <div className="text-center">
          <p className={`text-lg italic ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Progress isn't about doing more. It's about coming back.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
