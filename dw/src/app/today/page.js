// pages/Today.jsx
"use client";
import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const Today = ({ darkMode }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Binary Search Trees - Introduction', duration: '45 min', type: 'new', completed: false },
    { id: 2, title: 'BST Implementation Practice', duration: '75 min', type: 'new', completed: false },
    { id: 3, title: 'Arrays & Sorting - Quick Review', duration: '20 min', type: 'review', completed: true },
    { id: 4, title: 'Linked Lists Flashcards', duration: '15 min', type: 'review', completed: false },
    { id: 5, title: 'Time Complexity Quiz', duration: '25 min', type: 'review', completed: true },
  ]);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedCount / totalTasks) * 100;

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>3 hours planned</p>
        
        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>8 day streak</span>
          </div>
          <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {completedCount}/{totalTasks} tasks done
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mt-4 rounded-full h-2 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`rounded-xl p-4 border shadow-sm transition-all ${
              task.completed ? 'opacity-60' : ''
            } ${
              darkMode 
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-blue-500" />
                ) : (
                  <Circle size={24} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1">
                <h3 className={`font-semibold ${task.completed ? 'line-through' : ''} ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  {/* Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.type === 'new' 
                      ? darkMode
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                      : darkMode
                        ? 'bg-purple-900 text-purple-300'
                        : 'bg-purple-100 text-purple-700'
                  }`}>
                    {task.type === 'new' ? 'New Learning' : 'Review'}
                  </span>
                  {/* Duration */}
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex gap-3">
        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}>
          Mark All Complete
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
          Add Custom Task
        </button>
      </div>
    </div>
  );
};

export default Today;