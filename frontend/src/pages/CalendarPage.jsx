import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { trips, upcomingActivities } from '../data/mockData';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Find trip days in this month
  const tripDays = new Set();
  trips.forEach(trip => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getFullYear() === year && d.getMonth() === month) {
        tripDays.add(d.getDate());
      }
    }
  });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-emerald-100 p-2.5 rounded-xl"><CalendarDays className="w-6 h-6 text-emerald-600" /></div>
          Trip Calendar
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">See your trips and activities on a calendar view</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
            <h2 className="text-lg font-bold text-gray-900">{MONTHS[month]} {year}</h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider py-2">{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              const isTrip = day && tripDays.has(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              return (
                <div key={i} className={`aspect-square flex items-center justify-center rounded-xl text-[14px] font-medium transition-all cursor-pointer
                  ${!day ? '' : isTrip ? 'bg-amber-50 text-amber-700 font-bold hover:bg-amber-100' : isToday ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}
                `}>
                  {day && (
                    <div className="relative">
                      {day}
                      {isTrip && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Activities for month */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-[15px] mb-4">Upcoming Activities</h3>
          <div className="space-y-3">
            {upcomingActivities.map(act => (
              <div key={act.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 truncate">{act.name}</p>
                  <p className="text-[11px] text-gray-400">{act.city} • {act.date}</p>
                </div>
                <span className="text-[12px] font-bold text-amber-600 shrink-0">${act.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
