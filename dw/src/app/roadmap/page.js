"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Lock, Settings } from 'lucide-react';
import DashboardLayout from "components/DashboardLayout";
import { supabase } from 'lib/supabase';

export default function RoadmapPage({ darkMode }) {
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  // Fetch roadmap data from Supabase
  useEffect(() => {
    async function fetchRoadmap() {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks') // Replace with your table or view for roadmap
        .select(`
          week_id,
          week_title,
          unlock_date,
          day,
          date,
          hours,
          topic_title
        `)
        .order('date', { ascending: true });

      if (error) {
        console.log("Failed to fetch roadmap:", error);
      } else {
        // Group by week and then days
        const weeksMap = {};
        data.forEach(task => {
          if (!weeksMap[task.week_id]) {
            weeksMap[task.week_id] = {
              id: task.week_id,
              title: task.week_title,
              unlockDate: task.unlock_date,
              days: []
            };
          }

          let day = weeksMap[task.week_id].days.find(d => d.date === task.date);
          if (!day) {
            day = { day: task.day, date: task.date, hours: 0, topics: [] };
            weeksMap[task.week_id].days.push(day);
          }

          day.topics.push(task.topic_title);
          day.hours += task.hours;
        });

        setRoadmap(Object.values(weeksMap));
      }
      setLoading(false);
    }

    fetchRoadmap();
  }, []);

  const today = new Date();

  // Determine current week
  const currentWeek = roadmap?.find(week => new Date(week.unlockDate) <= today) || roadmap?.[0];
  const futureWeeks = roadmap?.filter(week => week.id !== currentWeek?.id) || [];

  const isLocked = (week) => {
    if (!autoLockEnabled) return false;
    const unlockDate = new Date(week.unlockDate);
    return today < unlockDate;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-8 px-6 text-center text-gray-500">
          Loading roadmap...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Roadmap
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Your learning path, one day at a time.
              </p>
            </div>

            {/* Settings Icon */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Settings size={24} />
            </button>
          </div>

          {/* Settings Dropdown */}
          {showSettings && (
            <div className={`mt-4 p-4 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Auto-lock future weeks
                  </h4>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Weeks unlock automatically 4 days before they start
                  </p>
                </div>
                <button
                  onClick={() => setAutoLockEnabled(!autoLockEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoLockEnabled ? 'bg-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    autoLockEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              {!autoLockEnabled && (
                <div className={`mt-3 p-2 rounded text-sm ${
                  darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'
                }`}>
                  🔓 All future weeks are now unlocked
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current Week */}
        {currentWeek && (
          <div className={`p-6 rounded-xl mb-8 border-2 ${
            darkMode 
              ? 'bg-blue-900 border-blue-700'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="text-sm font-medium mb-1" style={{ color: darkMode ? '#93C5FD' : '#2563EB' }}>
              Current focus
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentWeek.title}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentWeek.days.length} days remaining
            </p>
          </div>
        )}

        {/* Upcoming Days */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Coming up
          </h3>

          <div className="relative pl-8">
            <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <div className="space-y-8">
              {currentWeek?.days.map((day, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 ${darkMode ? 'bg-blue-500 border-gray-900' : 'bg-blue-400 border-gray-50'}`} />
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{day.day}</span>
                        <span className={`ml-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{day.date}</span>
                      </div>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{day.hours}h</span>
                    </div>
                    <ul className="space-y-1.5">
                      {day.topics.map((topic, i) => (
                        <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{topic}</li>
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
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Future weeks</h3>
          <div className="space-y-3">
            {futureWeeks.map(week => (
              <div key={week.id} className={`rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => !isLocked(week) && toggleWeek(week.id)}
                  disabled={isLocked(week)}
                  className={`w-full p-4 flex items-center justify-between ${isLocked(week) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    {isLocked(week) ? (
                      <Lock size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    ) : (
                      expandedWeeks[week.id] ? (
                        <ChevronDown size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      ) : (
                        <ChevronRight size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      )
                    )}
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{week.title}</span>
                  </div>
                  {isLocked(week) && <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Unlocks {week.unlockDate}</span>}
                </button>

                {expandedWeeks[week.id] && !isLocked(week) && (
                  <div className={`px-4 pb-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {week.days.map(day => (
                      <div key={day.date} className="mt-2">
                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{day.day} - {day.date} ({day.hours}h)</p>
                        <ul className="ml-4 list-disc">
                          {day.topics.map((topic, i) => (
                            <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
    </DashboardLayout>
  );
}
