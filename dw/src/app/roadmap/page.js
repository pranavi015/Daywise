"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';

const RoadmapPage = ({ darkMode }) => {
  const [expandedWeeks, setExpandedWeeks] = useState({});

  // Mock data
  const currentPhase = {
    title: "Week 1 · Fundamentals",
    daysRemaining: 4
  };

  const upcomingDays = [
    { day: "Mon", date: "Jan 27", hours: 2, topics: ["Binary Search Trees - Intro", "Practice Problems"] },
    { day: "Tue", date: "Jan 28", hours: 3, topics: ["BST Implementation", "Code Review"] },
    { day: "Wed", date: "Jan 29", hours: 2, topics: ["Graph Theory Basics"] },
    { day: "Thu", date: "Jan 30", hours: 2.5, topics: ["DFS & BFS Algorithms", "Practice"] },
    { day: "Fri", date: "Jan 31", hours: 2, topics: ["Review Week 1 Topics"] },
    { day: "Sat", date: "Feb 1", hours: 4, topics: ["Dynamic Programming Intro", "Memoization Practice"] },
    { day: "Sun", date: "Feb 2", hours: 3, topics: ["DP Problems", "Weekly Review"] },
  ];

  const futureWeeks = [
    { id: 2, title: "Week 2 · Advanced Data Structures", locked: false, unlockDate: "Feb 3" },
    { id: 3, title: "Week 3 · Algorithms Deep Dive", locked: true, unlockDate: "Feb 10" },
    { id: 4, title: "Week 4 · System Design Basics", locked: true, unlockDate: "Feb 17" },
  ];

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Roadmap
        </h2>
        <h1 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Your learning path, one day at a time.
        </h1>
      </div>

      {/* Current Phase Card */}
      <div className={`p-6 rounded-xl mb-8 border-2 ${
        darkMode 
          ? 'bg-blue-900 border-blue-700'
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="text-sm font-medium mb-1" style={{ color: darkMode ? '#93C5FD' : '#2563EB' }}>
          Current focus
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentPhase.title}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {currentPhase.daysRemaining} days remaining
        </p>
      </div>

      {/* Upcoming Days */}
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Coming up
        </h3>
        
        <div className="relative pl-8">
          {/* Vertical line connector */}
          <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`} />
          
          <div className="space-y-8">
            {upcomingDays.map((day, index) => (
              <div key={index} className="relative">
                {/* Bigger Dot */}
                <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 ${
                  darkMode 
                    ? 'bg-blue-500 border-gray-900'
                    : 'bg-blue-400 border-gray-50'
                }`} />
                
                {/* Content - No Card */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {day.day}
                      </span>
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {day.date}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {day.hours}h
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {day.topics.map((topic, i) => (
                      <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Weeks */}
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Future weeks
        </h3>
        <div className="space-y-3">
          {futureWeeks.map(week => (
            <div
              key={week.id}
              className={`rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => !week.locked && toggleWeek(week.id)}
                disabled={week.locked}
                className={`w-full p-4 flex items-center justify-between ${
                  week.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  {week.locked ? (
                    <Lock size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  ) : (
                    expandedWeeks[week.id] ? (
                      <ChevronDown size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronRight size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    )
                  )}
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {week.title}
                  </span>
                </div>
                {week.locked && (
                  <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Unlocks {week.unlockDate}
                  </span>
                )}
              </button>
              
              {expandedWeeks[week.id] && !week.locked && (
                <div className={`px-4 pb-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Week details will appear here...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reassurance Footer */}
      <div className="text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          This plan adapts automatically if you miss a day.
        </p>
      </div>
    </div>
  );
};

export default RoadmapPage;