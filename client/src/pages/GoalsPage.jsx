import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Calendar,
  X,
  BookOpen,
  Heart,
  Dumbbell,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'Study'
  });

  const templates = [
    { title: 'Master React Hooks', desc: 'Focus on UseEffect and UseMemo', category: 'Study', icon: <BookOpen size={16} /> },
    { title: 'Morning Run', desc: '30 minutes of light cardio', category: 'Health', icon: <Heart size={16} /> },
    { title: 'Learn 10 New Words', desc: 'Expand your vocabulary daily', category: 'Skill', icon: <Dumbbell size={16} /> },
    { title: 'Sleep 8 Hours', desc: 'Recovery for your mind', category: 'Health', icon: <Sparkles size={16} /> }
  ];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/goals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(data);
      localStorage.setItem('cached_goals', JSON.stringify(data));
    } catch (error) {
      console.warn('Backend unavailable, using Demo Mode');
      const cached = localStorage.getItem('cached_goals');
      if (cached) {
        setGoals(JSON.parse(cached));
      } else {
        setGoals([]); // Start empty in Demo Mode
      }
      toast.success('Running in Demo Mode! 🚀');
    } finally {
      setLoading(false);
    }
  };

  const quickAdd = async (template) => {
    const newGoal = {
      _id: Date.now().toString(),
      title: template.title,
      description: template.desc,
      category: template.category,
      progress: 0,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/goals', newGoal, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (error) {
      const updated = [...goals, newGoal];
      setGoals(updated);
      localStorage.setItem('cached_goals', JSON.stringify(updated));
    }
    toast.success(`${template.title} planted! 🌱`);
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    const newGoal = {
      ...formData,
      _id: Date.now().toString(),
      progress: 0
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/goals', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (error) {
      const updated = [...goals, newGoal];
      setGoals(updated);
      localStorage.setItem('cached_goals', JSON.stringify(updated));
    }
    
    toast.success('Goal set! Let\'s grow.');
    setShowAdd(false);
    setFormData({ title: '', description: '', deadline: '', category: 'Study' });
  };

  const updateProgress = async (id, current) => {
    const next = current + 10 >= 100 ? 100 : current + 10;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/goals/${id}`, { progress: next }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (error) {
      const updated = goals.map(g => g._id === id ? { ...g, progress: next } : g);
      setGoals(updated);
      localStorage.setItem('cached_goals', JSON.stringify(updated));
    }
    
    if (next === 100) toast.success('Goal accomplished! Perfect growth.');
  };

  const deleteGoal = async (id) => {
    if (!window.confirm('Remove this goal?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (error) {
      const updated = goals.filter(g => g._id !== id);
      setGoals(updated);
      localStorage.setItem('cached_goals', JSON.stringify(updated));
    }
    toast.success('Goal archived');
  };

  const categoryIcons = {
    'Study': <BookOpen size={24} className="text-growth-primary" />,
    'Health': <Heart size={24} className="text-growth-primary" />,
    'Skill': <Dumbbell size={24} className="text-growth-primary" />,
    'default': <Target size={24} className="text-growth-primary" />
  };

  const filteredGoals = activeFilter === 'All' 
    ? goals 
    : goals.filter(g => g.category === activeFilter);

  if (loading) return <div className="h-96 flex items-center justify-center font-bold text-growth-primary">Preparing your garden...</div>;

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-growth-dark tracking-tight">Goal Setting</h1>
          <p className="text-slate-500 font-medium">Break your journey into manageable steps.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="px-8 py-4 rounded-3xl bg-growth-primary text-white font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-growth-primary/30"
        >
          <Plus size={22} strokeWidth={3} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Templates / Suggested Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-growth-primary uppercase tracking-widest bg-growth-light/30 w-max px-3 py-1 rounded-full">
          <Sparkles size={14} className="fill-current" />
          Suggested Growth
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {templates.map((tpl, i) => (
             <motion.div
               whileHover={{ y: -5 }}
               key={i}
               onClick={() => quickAdd(tpl)}
               className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:border-growth-primary/20 cursor-pointer group flex flex-col justify-between"
             >
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 rounded-2xl bg-growth-light/30 text-growth-primary flex items-center justify-center">
                      {tpl.icon}
                   </div>
                   <ArrowUpRight size={16} className="text-slate-200 group-hover:text-growth-primary transition-colors" />
                </div>
                <div className="mt-4">
                   <h4 className="font-bold text-growth-dark text-sm">{tpl.title}</h4>
                   <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">{tpl.category}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3">
         {['All', 'Study', 'Health', 'Skill'].map(f => (
           <button
             key={f}
             onClick={() => setActiveFilter(f)}
             className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
               activeFilter === f 
               ? 'bg-growth-dark text-white' 
               : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
             }`}
           >
             {f}
           </button>
         ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGoals.map((goal) => (
            <motion.div
              layout
              key={goal._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 rounded-4xl bg-white border border-slate-100 shadow-sm flex flex-col gap-6 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-growth-light/50 flex items-center justify-center">
                   {categoryIcons[goal.category] || categoryIcons.default}
                </div>
                <button 
                  onClick={() => deleteGoal(goal._id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-growth-dark leading-tight">{goal.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 min-h-[2.5rem]">{goal.description || 'Nurturing this sprout daily.'}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</span>
                  <span className="text-2xl font-black text-growth-primary tracking-tighter">{goal.progress}%</span>
                </div>
                <div 
                  className="w-full h-4 bg-slate-50 rounded-full overflow-hidden cursor-pointer border border-slate-100 hover:ring-4 hover:ring-growth-primary/5 transition-all" 
                  onClick={() => updateProgress(goal._id, goal.progress)}
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    className={`h-full transition-colors ${goal.progress === 100 ? 'bg-growth-primary' : 'bg-growth-primary/60'}`} 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tighter pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50">
                  <Calendar size={12} />
                  {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Continuous'}
                </div>
                {goal.progress === 100 && (
                   <span className="text-growth-primary flex items-center gap-1">
                     <CheckCircle2 size={14} /> Full Bloom
                   </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredGoals.length === 0 && (
          <div className="col-span-full h-80 rounded-5xl border-4 border-dashed border-slate-50 flex flex-col items-center justify-center text-slate-200 gap-4">
            <Target size={64} className="stroke-[1] opacity-50" />
            <p className="font-bold text-lg">No sprouting {activeFilter !== 'All' ? activeFilter : ''} goals found.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-growth-dark/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-5xl p-10 w-full max-w-lg shadow-2xl relative border border-slate-100"
            >
              <button 
                onClick={() => setShowAdd(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
              
              <h2 className="text-2xl font-black text-growth-dark mb-8 tracking-tight">Plant a New Seed</h2>
              
              <form onSubmit={handleAddGoal} className="space-y-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">What is your goal?</label>
                   <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-growth-primary/5 font-medium transition-all" placeholder="e.g. Master React Hooks" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Deadline (Optional)</label>
                    <input type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-xs" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Focus Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-xs appearance-none">
                       <option>Study</option>
                       <option>Health</option>
                       <option>Skill</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button type="submit" className="flex-1 py-5 rounded-3xl bg-growth-primary text-white font-bold shadow-xl shadow-growth-primary/30 hover:scale-[1.02] transition-transform">Start Growing</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalsPage;
