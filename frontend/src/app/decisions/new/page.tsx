'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { decisionsAPI } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';

export default function NewDecisionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('career');
  const [context, setContext] = useState({
    current_situation: '',
    goals: '',
    constraints: '',
    timeline: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const decision = await decisionsAPI.create({
        title,
        description,
        category,
        context: {
          ...context,
          created_via: 'web',
        },
      });

      router.push(`/decisions/${decision.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create decision');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Decision</h1>
          <p className="text-gray-600 mb-8">
            Describe your decision and we'll help you visualize potential outcomes
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Decision Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Switch from Finance to Software Engineering"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="career">Career</option>
                <option value="finance">Finance</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Provide more details about your decision..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Context (Optional)</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="current_situation" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Situation
                  </label>
                  <textarea
                    id="current_situation"
                    value={context.current_situation}
                    onChange={(e) => setContext({ ...context, current_situation: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your current situation..."
                  />
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                    Goals
                  </label>
                  <textarea
                    id="goals"
                    value={context.goals}
                    onChange={(e) => setContext({ ...context, goals: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What do you hope to achieve?"
                  />
                </div>

                <div>
                  <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-2">
                    Constraints
                  </label>
                  <textarea
                    id="constraints"
                    value={context.constraints}
                    onChange={(e) => setContext({ ...context, constraints: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any limitations or constraints?"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <input
                    id="timeline"
                    type="text"
                    value={context.timeline}
                    onChange={(e) => setContext({ ...context, timeline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 6-12 months"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Decision'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

