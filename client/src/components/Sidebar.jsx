import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  LayoutDashboard, 
  Target, 
  Heart, 
  Users, 
  LogOut,
  Sun,
  Moon,
  Play,
  Pause,
  Music,
  SkipForward
} from 'lucide-react';

const Sidebar = ({ user, setUser, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleAudio = () => {
    // Current "Lo-fi" stream or static track for demo
    // Note: In real app, this would be a URL to a lo-fi stream
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Focus Beats paused.' : 'Focus Beats: Deep Lo-fi 🎵');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, show: !!user },
    { name: 'Goal Setting', path: '/goals', icon: <Target size={20} />, show: !!user },
    { name: 'Well-being', path: '/mental-health', icon: <Heart size={20} />, show: !!user },
    { name: 'Community', path: '/community', icon: <Users size={20} />, show: !!user },
  ];

  const activeLink = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-growth-sidebar border-r border-slate-200 flex flex-col p-6 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-12 px-2">
        <Leaf className="text-growth-primary fill-growth-primary" size={28} />
        <span className="text-2xl font-bold text-growth-dark tracking-tight">
          GrowthTrack
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.filter(l => l.show).map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
              activeLink(link.path)
              ? 'bg-white text-growth-primary shadow-sm'
              : 'text-slate-500 hover:bg-white/50 hover:text-growth-primary'
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Focus Beats Player */}
      {user && (
        <div className="mb-4 p-4 rounded-3xl bg-growth-dark text-white flex flex-col gap-3 shadow-xl shadow-growth-dark/20 relative overflow-hidden group">
           <div className="flex justify-between items-center z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-growth-light opacity-60">Focus Beats</span>
              <Music size={14} className="opacity-60" />
           </div>
           <div className="flex items-center gap-3 z-10">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-growth-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white"
              >
                 {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
              <div className="flex flex-col overflow-hidden">
                 <span className="text-xs font-bold truncate">Study Lo-fi</span>
                 <span className="text-[8px] font-black uppercase tracking-tighter text-growth-light opacity-40">Phase: Deep Work</span>
              </div>
              <button className="ml-auto opacity-40 hover:opacity-100 transition-opacity">
                 <SkipForward size={14} />
              </button>
           </div>
           {/* Waveform animation (pure CSS placeholder) */}
           {isPlaying && (
             <div className="flex items-center gap-0.5 h-1 absolute bottom-0 left-0 w-full px-4 overflow-hidden opacity-30">
                {[1, 2, 3, 4, 5, 2, 4, 3, 1, 4, 2, 5, 3, 1].map((h, i) => (
                  <div key={i} className="flex-1 bg-white animate-pulse" style={{ height: `${h * 20}%`, animationDuration: `${0.5 + Math.random()}s` }} />
                ))}
             </div>
           )}
        </div>
      )}

      {/* User Profile Snippet */}
      {user && (
        <div className="mb-6 px-2 py-4 rounded-3xl bg-growth-light/30 border border-growth-primary/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-growth-primary shadow-sm">
            {user.name?.substring(0, 1).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-growth-dark truncate">{user.name}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Consistency: High</span>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4 pt-6 border-t border-slate-200">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-semibold hover:bg-white/50 transition-all text-sm"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-2xl text-slate-400 font-bold hover:text-red-500 transition-all text-xs uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
