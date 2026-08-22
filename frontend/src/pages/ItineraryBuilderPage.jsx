import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Calendar, DollarSign, Edit3, Trash2, ArrowRight, Sparkles, MapPin, Hotel, Plane, Compass, Loader2, Save, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { tripService, expenseService } from '../api/client';

const INITIAL_SECTIONS = [
  {
    id: 1,
    title: 'Section 1: Flight & Airport Transfers',
    description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity. Includes roundtrip flights to Paris CDG and private airport shuttle.',
    dateRange: 'Jul 15 to Jul 16, 2026',
    budget: '₹850.00',
    icon: Plane,
  },
  {
    id: 2,
    title: 'Section 2: Hotel & Luxury Accommodation',
    description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity. 5-night stay at Le Marais Boutique Hotel with daily breakfast.',
    dateRange: 'Jul 16 to Jul 21, 2026',
    budget: '₹1,200.00',
    icon: Hotel,
  },
  {
    id: 3,
    title: 'Section 3: Sightseeing, Museums & Dining',
    description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity. Louvre Museum guided tour, Eiffel Tower dinner, and Seine cruise.',
    dateRange: 'Jul 17 to Jul 20, 2026',
    budget: '₹450.00',
    icon: Compass,
  },
];

// Parse a budget string like "₹1,200.00" or "$850" to a number
function parseBudget(str) {
  if (!str) return 0;
  const cleaned = String(str).replace(/[₹$,\s]/g, '');
  return parseFloat(cleaned) || 0;
}

export default function ItineraryBuilderPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const { isDark } = useTheme();
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingBudget, setSavingBudget] = useState(false);
  const [budgetExpenseId, setBudgetExpenseId] = useState(null); // track existing expense to update vs create
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    tripService.get(tripId || 1)
      .then(setTrip)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  // Compute total budget live from sections
  const totalBudget = sections.reduce((acc, s) => acc + parseBudget(s.budget), 0);

  // Auto-sync the section total to backend whenever it changes (debounced)
  useEffect(() => {
    if (!tripId) return;
    const timer = setTimeout(async () => {
      try {
        if (budgetExpenseId) {
          // Update existing expense
          await expenseService.update(budgetExpenseId, { amount: totalBudget });
        } else {
          // Check if one already exists for this trip
          const existing = await expenseService.list(tripId);
          const existingEntry = (Array.isArray(existing) ? existing : existing.results ?? [])
            .find(e => e.description === 'Builder Budget Total');
          if (existingEntry) {
            setBudgetExpenseId(existingEntry.id);
            await expenseService.update(existingEntry.id, { amount: totalBudget });
          } else {
            // Create fresh entry
            const created = await expenseService.create({
              trip: parseInt(tripId, 10),
              category: 'Other',
              description: 'Builder Budget Total',
              amount: totalBudget,
              date: new Date().toISOString().split('T')[0],
            });
            setBudgetExpenseId(created.id);
          }
        }
      } catch { /* silent — non-critical */ }
    }, 800);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalBudget, tripId]);

  const addSection = () => {
    const nextNum = sections.length + 1;
    const newSection = {
      id: Date.now(),
      title: `Section ${nextNum}: New Travel Section / Activity`,
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity.',
      dateRange: 'Jul 21 to Jul 25, 2026',
      budget: '₹300.00',
      icon: MapPin,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };
  
  const startEditing = (section) => {
    setEditingId(section.id);
    setEditForm({ ...section });
  };

  const saveEdit = () => {
    setSections(sections.map(s => s.id === editingId ? editForm : s));
    setEditingId(null);
    setEditForm(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // Save computed budget to backend then navigate to the view
  const handleViewTimeline = async () => {
    setSavingBudget(true);
    try {
      // Persist total budget as a synthetic expense so the View page shows the correct amount
      await expenseService.create({
        trip: parseInt(tripId || 1, 10),
        category: 'Other',
        description: 'Builder Budget Total',
        amount: totalBudget,
        date: trip?.start_date || new Date().toISOString().split('T')[0],
      });
    } catch {
      // Non-critical — still navigate even if save fails
    } finally {
      setSavingBudget(false);
      navigate(`/itinerary/${tripId || 1}`);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8 pb-16">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            {loading ? <Loader2 className="w-6 h-6 animate-spin text-amber-500" /> : `Build: ${trip?.name || 'Itinerary'}`}
          </h1>
          <p className={`text-sm mt-1.5 ml-14 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
            Organize your trip into structured sections for travel, hotels, and activities
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Live total budget display */}
          <div className={`px-4 py-2 rounded-2xl border text-right ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-amber-50 border-amber-200'}`}>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Budget</span>
            <span className="text-lg font-black text-amber-500">₹{totalBudget.toLocaleString()}</span>
          </div>
          <button
            onClick={handleViewTimeline}
            disabled={savingBudget}
            className={`px-5 py-2.5 font-bold rounded-2xl transition-colors flex items-center gap-2 text-sm ${
              isDark ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            } disabled:opacity-60`}
          >
            {savingBudget ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            View Full Timeline
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon || MapPin;
          const isEditing = editingId === section.id;
          
          return (
            <div
              key={section.id}
              className={`rounded-3xl p-8 shadow-sm border relative group space-y-4 transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.title} 
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className={`flex-1 font-extrabold text-xl bg-transparent border-b-2 focus:outline-none px-2 py-1 ${isDark ? 'border-amber-500 text-white' : 'border-amber-500 text-gray-900'}`}
                    />
                  ) : (
                    <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {section.title}
                    </h2>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity ml-4">
                    <button onClick={() => startEditing(section)} className="p-2 rounded-xl text-gray-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {sections.length > 1 && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea 
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className={`w-full text-sm leading-relaxed font-normal p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                  rows="3"
                />
              ) : (
                <p className={`text-sm leading-relaxed font-normal ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  {section.description}
                </p>
              )}

              <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2.5 border rounded-2xl text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-100 text-gray-700'
                  }`}>
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.dateRange}
                        onChange={(e) => setEditForm({...editForm, dateRange: e.target.value})}
                        className="bg-transparent border-b focus:outline-none border-amber-500 px-1 w-32 md:w-48 text-amber-600"
                      />
                    ) : (
                      <span>Date Range: <strong className={isDark ? 'text-white' : 'text-gray-900'}>{section.dateRange}</strong></span>
                    )}
                  </div>

                  <div className={`flex items-center gap-2 px-4 py-2.5 border rounded-2xl text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-100 text-gray-700'
                  }`}>
                    <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.budget}
                        onChange={(e) => setEditForm({...editForm, budget: e.target.value})}
                        className="bg-transparent border-b focus:outline-none border-emerald-500 px-1 w-24 md:w-32 text-emerald-500"
                      />
                    ) : (
                      <span>Budget of this section: <strong className="text-emerald-500">{section.budget}</strong></span>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className={`p-2.5 rounded-xl border transition-colors ${isDark ? 'text-gray-400 border-slate-700 hover:bg-slate-800' : 'text-gray-500 border-gray-200 hover:bg-gray-100'}`}>
                      <X className="w-4 h-4" />
                    </button>
                    <button onClick={saveEdit} className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md hover:bg-amber-600 transition-colors flex items-center gap-1.5 font-bold text-sm">
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={addSection}
          className={`py-4 px-8 border-2 border-dashed font-extrabold rounded-3xl shadow-sm transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer hover:scale-105 ${
            isDark
              ? 'bg-slate-900 border-amber-500/50 text-amber-400 hover:bg-slate-800'
              : 'bg-white border-amber-400 text-amber-600 hover:bg-amber-50'
          }`}
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          Add another Section
        </button>
      </div>

    </div>
  );
}
