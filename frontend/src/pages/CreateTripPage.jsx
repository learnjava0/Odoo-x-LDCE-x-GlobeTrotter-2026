import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, ImagePlus, FileText, ArrowRight } from 'lucide-react';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '', coverPhoto: '' });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/trips');
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-amber-100 p-2.5 rounded-xl"><PlusCircle className="w-6 h-6 text-amber-600" /></div>
          Create New Trip
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">Start planning your next adventure by filling in the basics.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Trip Name</label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
            <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Summer in Paris & Rome"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe your trip..."
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <input type="date" required value={form.startDate} onChange={(e) => update('startDate', e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <input type="date" required value={form.endDate} onChange={(e) => update('endDate', e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Cover Photo URL</label>
          <div className="relative">
            <ImagePlus className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
            <input type="url" value={form.coverPhoto} onChange={(e) => update('coverPhoto', e.target.value)} placeholder="https://images.unsplash.com/..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={() => navigate('/trips')} className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-[14px]">Cancel</button>
          <button type="submit" className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200/50 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-[14px] cursor-pointer">
            Create Trip <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
