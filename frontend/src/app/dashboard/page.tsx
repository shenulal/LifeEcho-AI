'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { decisionsAPI } from '@/lib/api';
import { Plus, LogOut, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Decision {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuthStore();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loadingDecisions, setLoadingDecisions] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDecisions();
    }
  }, [isAuthenticated]);

  const loadDecisions = async () => {
    try {
      const data = await decisionsAPI.getAll();
      setDecisions(data);
    } catch (error) {
      console.error('Error loading decisions:', error);
    } finally {
      setLoadingDecisions(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      career: 'bg-blue-100 text-blue-700',
      finance: 'bg-green-100 text-green-700',
      health: 'bg-red-100 text-red-700',
      business: 'bg-purple-100 text-purple-700',
      education: 'bg-yellow-100 text-yellow-700',
      personal: 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'simulating') return <Clock className="w-4 h-4 text-yellow-600 animate-spin" />;
    return <TrendingUp className="w-4 h-4 text-gray-600" />;
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              LifeEcho <span className="text-primary-600">AI</span>
            </h1>
            <p className="text-sm text-gray-600">Welcome back, {user?.full_name || user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Decisions</h2>
            <p className="text-gray-600 mt-1">Explore and simulate your future paths</p>
          </div>
          <button
            onClick={() => router.push('/decisions/new')}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Decision
          </button>
        </div>

        {loadingDecisions ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : decisions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No decisions yet</h3>
            <p className="text-gray-600 mb-6">Create your first decision to start visualizing your future</p>
            <button
              onClick={() => router.push('/decisions/new')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Decision
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decisions.map((decision) => (
              <div
                key={decision.id}
                onClick={() => router.push(`/decisions/${decision.id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(decision.category)}`}>
                    {decision.category}
                  </span>
                  {getStatusIcon(decision.status)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {decision.title}
                </h3>
                {decision.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {decision.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(decision.created_at).toLocaleDateString()}</span>
                  <span className="capitalize">{decision.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

