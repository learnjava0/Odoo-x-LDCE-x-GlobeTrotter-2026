import { useState } from 'react';
import { Search, Users, Heart, MessageCircle, Share2, MapPin, Info, Sparkles, Send, Plus, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const INITIAL_COMMUNITY_POSTS = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    title: '10 Secrets for Experiencing Paris Like a Local',
    location: 'Paris, France',
    date: 'Aug 18, 2026',
    content: 'Just finished a 7-day trip in Le Marais! Skip the huge crowds at the main Eiffel tower line by visiting early at 8:30 AM. Also, try the small boulangerie on Rue des Rosiers for the best croissants.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    likes: 142,
    comments: 28,
  },
  {
    id: 2,
    author: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    title: 'Autumn in Kyoto — Shrine Hop & Ramen Trail',
    location: 'Kyoto, Japan',
    date: 'Aug 15, 2026',
    content: 'Fushimi Inari is magical at sunrise! Walk all the way to the top loop to escape 90% of tourists. Grab hot matcha ice cream at the base mountain shops afterward.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    likes: 215,
    comments: 45,
  },
  {
    id: 3,
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    title: 'Hiking Path of the Gods on Amalfi Coast',
    location: 'Amalfi Coast, Italy',
    date: 'Aug 10, 2026',
    content: 'Start early from Bomerano to Positano. The coastal cliff views are absolutely breathtaking! Make sure to pack sturdy hiking boots and 2 liters of water.',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    likes: 98,
    comments: 14,
  },
];

export default function CommunityPage() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(INITIAL_COMMUNITY_POSTS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [postTitle, setPostTitle] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: user?.name || 'Traveler',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      title: postTitle,
      location: postLocation || 'GlobeTrotter Community',
      date: 'Just now',
      content: postContent,
      image: postImageUrl || null,
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostLocation('');
    setPostContent('');
    setPostImageUrl('');
    setShowCreateModal(false);
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-8 max-w-6xl mx-auto pb-16 relative">
      
      {/* Controls Bar */}
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
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-md text-[13px] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Users className="w-6 h-6 text-amber-500" /> Community tab
            </h1>
            <span className="text-xs text-gray-400 font-medium">{filteredPosts.length} Experiences Shared</span>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex gap-4 items-start">
                
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 overflow-hidden shrink-0 shadow-md">
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                </div>

                <div className={`flex-1 rounded-3xl p-6 shadow-sm border space-y-4 transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.author}</h3>
                      <p className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500" /> {post.location} • {post.date}
                      </p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-[10px]">
                      Shared Trip
                    </span>
                  </div>

                  <h4 className={`font-extrabold text-sm ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{post.title}</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{post.content}</p>

                  {post.image && (
                    <div className="h-56 rounded-2xl overflow-hidden shadow-inner">
                      <img src={post.image} alt="Trip" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  <div className={`pt-3 border-t flex items-center gap-6 text-xs font-semibold ${isDark ? 'border-slate-800 text-slate-400' : 'border-gray-50 text-gray-500'}`}>
                    <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {post.likes} Likes
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-amber-500 transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" /> {post.comments} Comments
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-amber-500 transition-colors ml-auto cursor-pointer">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Description Box */}
        <div className="space-y-6">
          <div className={`rounded-3xl p-6 shadow-sm border space-y-4 sticky top-24 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-200'
              : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200/50 text-gray-800'
          }`}>
            <div className="flex items-center gap-2 text-amber-500 font-extrabold text-sm uppercase tracking-wider">
              <Info className="w-4 h-4" /> About Community Section
            </div>
            <p className={`text-xs leading-relaxed font-normal ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Community section where all the users can share their experience about a certain trip or activity.
              Using the search, groupby or filter and sortby option, the user can narrow down the result that he is looking for...
            </p>
            <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-500 font-bold">
              <span>Connect & Share</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
              <h3 className="text-xl font-extrabold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Share Experience Post
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Post Title</label>
                <input type="text" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="e.g. My Trip to Tokyo"
                  className={`w-full px-4 py-3 border rounded-2xl text-xs font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Location</label>
                <input type="text" value={postLocation} onChange={(e) => setPostLocation(e.target.value)} placeholder="e.g. Tokyo, Japan"
                  className={`w-full px-4 py-3 border rounded-2xl text-xs font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Content</label>
                <textarea rows={4} required value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Write your experience..."
                  className={`w-full px-4 py-3 border rounded-2xl text-xs font-medium resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Image URL</label>
                <input type="url" value={postImageUrl} onChange={(e) => setPostImageUrl(e.target.value)} placeholder="https://..."
                  className={`w-full px-4 py-3 border rounded-2xl text-xs font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg text-xs flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
