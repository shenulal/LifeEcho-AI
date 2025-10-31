'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { decisionsAPI } from '@/lib/api';
import { ArrowLeft, Sparkles, TrendingUp, AlertTriangle, Lightbulb, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Scenario {
  id: string;
  title: string;
  description: string;
  probability: number;
  timeline_data: any[];
  outcomes: any;
  risks: any[];
  recommendations: string;
  rank: number;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  context: any;
}

export default function DecisionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [decision, setDecision] = useState<Decision | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDecision();
  }, [id]);

  const loadDecision = async () => {
    try {
      const data = await decisionsAPI.getById(id);
      setDecision(data.decision);
      setScenarios(data.scenarios || []);
    } catch (err) {
      setError('Failed to load decision');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setError('');

    try {
      const data = await decisionsAPI.simulate(id, 3, 5);
      setDecision(data.decision);
      setScenarios(data.scenarios);
      setSelectedScenario(0);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate scenarios');
    } finally {
      setIsSimulating(false);
    }
  };

  const prepareFinancialChartData = (outcomes: any) => {
    if (!outcomes?.financial) return [];
    
    return Object.entries(outcomes.financial).map(([key, value]) => ({
      year: key.replace('year_', 'Year '),
      amount: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!decision) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Decision not found</h2>
          <button onClick={() => router.push('/dashboard')} className="text-primary-600 hover:text-primary-700">
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Decision Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {decision.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{decision.title}</h1>
              {decision.description && (
                <p className="text-gray-600">{decision.description}</p>
              )}
            </div>
            {scenarios.length === 0 && (
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                {isSimulating ? 'Generating...' : 'Generate Scenarios'}
              </button>
            )}
          </div>

          {decision.context && Object.keys(decision.context).length > 0 && (
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {decision.context.current_situation && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Current Situation</h3>
                  <p className="text-gray-600 text-sm">{decision.context.current_situation}</p>
                </div>
              )}
              {decision.context.goals && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Goals</h3>
                  <p className="text-gray-600 text-sm">{decision.context.goals}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isSimulating && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Scenarios...</h3>
            <p className="text-gray-600">Our AI is analyzing your decision and creating future scenarios</p>
          </div>
        )}

        {!isSimulating && scenarios.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scenarios yet</h3>
            <p className="text-gray-600 mb-6">Generate AI-powered scenarios to visualize potential outcomes</p>
            <button
              onClick={handleSimulate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Generate Scenarios
            </button>
          </div>
        )}

        {scenarios.length > 0 && (
          <>
            {/* Scenario Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex gap-2 overflow-x-auto">
                {scenarios.map((scenario, index) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(index)}
                    className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      selectedScenario === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Scenario {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {currentScenario && (
              <div className="space-y-6">
                {/* Scenario Overview */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentScenario.title}</h2>
                      <p className="text-gray-600">{currentScenario.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">
                        {Math.round(currentScenario.probability * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Probability</div>
                    </div>
                  </div>
                </div>

                {/* Financial Outcomes */}
                {currentScenario.outcomes?.financial && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      Financial Projection
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={prepareFinancialChartData(currentScenario.outcomes)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={2} name="Income" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Timeline */}
                {currentScenario.timeline_data && currentScenario.timeline_data.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-600" />
                      Timeline
                    </h3>
                    <div className="space-y-4">
                      {currentScenario.timeline_data.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-700">
                            {item.period}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                item.impact === 'positive' ? 'bg-green-500' :
                                item.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                              }`}></div>
                              <p className="text-gray-700">{item.event}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risks */}
                {currentScenario.risks && currentScenario.risks.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Risk Factors
                    </h3>
                    <div className="space-y-4">
                      {currentScenario.risks.map((risk: any, index: number) => (
                        <div key={index} className="border-l-4 border-orange-400 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{risk.factor}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              risk.severity === 'high' ? 'bg-red-100 text-red-700' :
                              risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {risk.severity}
                            </span>
                          </div>
                          {risk.mitigation && (
                            <p className="text-sm text-gray-600">Mitigation: {risk.mitigation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {currentScenario.recommendations && (
                  <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl shadow-sm p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary-600" />
                      Recommendations
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{currentScenario.recommendations}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

