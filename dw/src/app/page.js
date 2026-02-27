import React from 'react';
import Link from 'next/link';
import { Calendar, TrendingUp, Target, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Daywise</h1>
          <div className="flex gap-4">
          <Link href="/auth" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Learn anything,<br />one day at a time.
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Turn your learning goals into a clear daily plan. Stay consistent, track progress, and actually finish what you start.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-lg transition flex items-center gap-2"
          >
            Start Learning Free
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Hero Visual Placeholder */}
        <div className="mt-16 rounded-2xl border-2 border-gray-200 bg-gray-50 p-8 max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">Dashboard Preview</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Learning shouldn't feel overwhelming
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You have the motivation. You just need the structure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">😰</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Too much planning</h4>
              <p className="text-gray-600">You spend hours planning instead of learning. Analysis paralysis wins.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No clear path</h4>
              <p className="text-gray-600">You know what to learn, but not when or how to break it down.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">💔</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Can't stay consistent</h4>
              <p className="text-gray-600">Life gets busy. You miss a day, then a week, then you quit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How Daywise helps
            </h3>
          </div>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
                  <Target className="text-blue-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  AI-powered learning roadmap
                </h4>
                <p className="text-lg text-gray-600 mb-6">
                  Tell us what you want to learn. We'll create a personalized daily plan that fits your schedule. No more guessing what to study next.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Upload your syllabus or let AI generate one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Automatically break down topics into daily tasks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Adapts to your available hours each day</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <p className="text-gray-500">Roadmap Feature Visual</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center md:order-first">
                <p className="text-gray-500">Daily Tasks Visual</p>
              </div>
              <div>
                <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
                  <Calendar className="text-blue-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Focus on today, forget the rest
                </h4>
                <p className="text-lg text-gray-600 mb-6">
                  Every morning, see exactly what to learn today. No decisions. No overwhelm. Just start.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Clear daily to-do list</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Spaced repetition for better retention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Track time spent and build streaks</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
                  <TrendingUp className="text-blue-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Stay motivated with gentle progress
                </h4>
                <p className="text-lg text-gray-600 mb-6">
                  See how far you've come. Celebrate consistency, not perfection. Miss a day? The plan adjusts automatically.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Streak counter keeps you accountable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Visualize your learning journey</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">No shame, just progress</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <p className="text-gray-500">Progress Dashboard Visual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Start learning the right way
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join learners who are finally making progress on their goals.
          </p>
          <a href="/signup" className="inline-block px-8 py-4 bg-white text-blue-500 rounded-lg hover:bg-gray-100 font-medium text-lg transition">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Daywise</h1>
              <p className="text-gray-600 text-sm">Learn anything, one day at a time.</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2026 Daywise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}