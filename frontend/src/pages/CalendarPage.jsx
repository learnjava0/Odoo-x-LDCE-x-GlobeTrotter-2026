import { useState } from "react";

import { Search, ChevronLeft, ChevronRight, CalendarDays, Plus, Clock, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const mockActivities = [
  { id: 1, name: "Eiffel Tower Visit", city: "Paris", date: "Jul 16, 2026", cost: 26.00, category: "sightseeing" },
  { id: 2, name: "Louvre Museum", city: "Paris", date: "Jul 17, 2026", cost: 17.00, category: "sightseeing" },
  { id: 3, name: "Seine River Cruise", city: "Paris", date: "Jul 18, 2026", cost: 15.00, category: "adventure" },
];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1));
  const [selectedDay, setSelectedDay] = useState(16);
  const [eventsList, setEventsList] = useState([
    { id: 1, title: 'Summer in Paris', startDate: '2026-07-15', endDate: '2026-07-21', color: 'bg-amber-500 text-white' },
    { id: 2, title: 'Rome Exploration', startDate: '2026-07-22', endDate: '2026-07-28', color: 'bg-purple-600 text-white' },
    { id: 3, title: 'Amalfi Getaway', startDate: '2026-09-02', endDate: '2026-09-09', color: 'bg-emerald-600 text-white' },
    { id: 4, title: 'Tokyo Autumn Tour', startDate: '2026-10-10', endDate: '2026-10-22', color: 'bg-blue-600 text-white' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState('2026-07-16');
  const [newEventEnd, setNewEventEnd] = useState('2026-07-18');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const colors = ['bg-amber-500 text-white', 'bg-purple-600 text-white', 'bg-emerald-600 text-white', 'bg-blue-600 text-white'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setEventsList([...eventsList, { id: Date.now(), title: newEventTitle, startDate: newEventStart, endDate: newEventEnd, color: randomColor }]);
    setNewEventTitle('');
    setShowAddModal(false);
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const activeMonthEvents = eventsList.filter(e => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return (start.getFullYear() === year && start.getMonth() === month) || (end.getFullYear() === year && end.getMonth() === month);
  });

  return (
    <div className="animate-fade-in space-y-8 max-w-6xl mx-auto pb-16 relative">
      
      {/* Top Controls Bar */}
      <div className={`rounded-2xl p-3 shadow-sm border flex flex-col md:flex-row items-center gap-3 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bar ......"
            className={`w-full pl-11 pr-4 py-3 border rounded-xl text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400'
            }`}
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-md text-[13px] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Trip Event
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Card */}
        <div className={`lg:col-span-2 rounded-3xl p-6 shadow-sm border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
        }`}>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {MONTH_NAMES[month]} {year}
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Click any date to inspect scheduled trips</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-100 text-gray-600 hover:bg-gray-100'
              }`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-100 text-gray-600 hover:bg-gray-100'
              }`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-7 gap-1 text-center font-extrabold text-xs uppercase tracking-wider py-2 border-b ${
            isDark ? 'text-slate-400 border-slate-800' : 'text-gray-400 border-gray-50'
          }`}>
            {DAYS_OF_WEEK.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((dayNum, idx) => {
              if (!dayNum) return <div key={`empty-${idx}`} className={`h-24 rounded-2xl ${isDark ? 'bg-slate-800/30' : 'bg-gray-50/30'}`} />;

              const dayDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const matchingEvent = eventsList.find(e => {
                const start = new Date(e.startDate);
                const end = new Date(e.endDate);
                const current = new Date(dayDateStr);
                return current >= start && current <= end;
              });

              const isSelected = selectedDay === dayNum;

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/10 shadow-sm'
                      : isDark
                        ? 'bg-slate-800/60 border-slate-700 hover:border-amber-500/50'
                        : 'bg-white border-gray-100 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-500' : isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                      {dayNum}
                    </span>
                    {matchingEvent && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                  </div>

                  {matchingEvent ? (
                    <div className={`text-[10px] font-extrabold px-2 py-1 rounded-xl shadow-xs truncate ${matchingEvent.color}`}>
                      {matchingEvent.title}
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium">Free</span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Sidebar Details */}
        <div className="space-y-6">
          <div className={`rounded-3xl p-6 shadow-sm border space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`font-extrabold text-base flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Clock className="w-4 h-4 text-amber-500" />
              Selected: {MONTH_NAMES[month]} {selectedDay}, {year}
            </h3>

            <div className="space-y-3">
              {activeMonthEvents.map(event => (
                <div key={event.id} className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`font-extrabold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">Trip</span>
                  </div>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <CalendarDays className="w-3 h-3 text-amber-500" /> {event.startDate} → {event.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-3xl p-6 shadow-sm border space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Activities</h3>
            <div className="space-y-3">
              {mockActivities.slice(0, 4).map(act => (
                <div key={act.id} className={`flex items-center gap-3 p-3 rounded-2xl ${
                  isDark ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 font-bold text-xs">
                    {act.city.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{act.name}</p>
                    <p className="text-[10px] text-gray-400">{act.city} • {act.date}</p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-500 shrink-0">${act.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold">Add Trip Event</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Event / Trip Name</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Barcelona Weekend"
                  className={`w-full px-4 py-3 border rounded-2xl text-xs font-medium ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Start Date</label>
                  <input type="date" required value={newEventStart} onChange={(e) => setNewEventStart(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">End Date</label>
                  <input type="date" required value={newEventEnd} onChange={(e) => setNewEventEnd(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-xl text-xs ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg text-xs">
                Add Event to Calendar
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
