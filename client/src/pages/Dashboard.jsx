import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  BookOpen, 
  Dumbbell, 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  X,
  Droplets,
  Calendar,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalHours: 0,
    improvement: 0,
    insight: "Keep planting seeds of knowledge."
  });
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [isWatering, setIsWatering] = useState(false);
  const [activeStat, setActiveStat] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/stats/insights', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats({
        totalHours: data.totalHours,
        improvement: data.improvement,
        insight: data.insight
      });
      setDailyData(data.dailyStats || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatering = () => {
    setIsWatering(true);
    setTimeout(() => {
      setIsWatering(false);
      toast.success('Your garden is nurtured! 🌱');
    }, 3000);
  };

  const growthProgress = Math.min((stats.totalHours / 100) * 100, 100);

  const StatCard = ({ title, value, sub, icon, trend, id }) => (
    <motion.div 
      whileHover={{ y: -5, cursor: 'pointer' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveStat({ title, value, id })}
      className="p-8 rounded-4xl bg-white border border-slate-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-growth-light/30 group-hover:text-growth-primary transition-all duration-500">
           {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-growth-primary bg-growth-light/30 px-2 py-1 rounded-full">
            <TrendingUp size={10} />
            {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-growth-dark tracking-tighter">{value}</span>
          <span className="text-xs font-bold text-slate-400">{sub}</span>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
         {icon}
      </div>
    </motion.div>
  );

  if (loading) return <div className="h-96 flex items-center justify-center font-bold text-growth-primary animate-pulse text-xl">Nurturing your garden...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome Header */}
      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-4xl font-black text-growth-dark tracking-tight leading-tight mb-1">
            Happy Growing, <span className="text-growth-primary">{user?.name?.split(' ')[0]}!</span>
          </h1>
          <p className="text-slate-500 font-medium italic text-sm">
            "{stats.insight}"
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
           <button 
             onClick={handleWatering}
             disabled={isWatering}
             className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
               isWatering ? 'bg-slate-100 text-slate-400' : 'bg-growth-dark text-white shadow-xl shadow-growth-dark/20 hover:scale-105 active:scale-95'
             }`}
           >
              <Droplets size={16} className={isWatering ? 'animate-bounce' : ''} />
              {isWatering ? 'Watering...' : 'Water Garden'}
           </button>
        </div>
      </div>

      {/* Main Growth Card */}
      <div className="p-12 rounded-5xl bg-white border border-slate-100 shadow-sm flex flex-col items-center gap-8 relative overflow-hidden text-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-growth-primary/10 via-growth-primary/40 to-growth-primary/10" />
        
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-growth-dark tracking-tight">Your Growth Plant</h2>
           <p className="text-slate-400 text-sm font-medium">Consistency is the water of the mind.</p>
        </div>

        {/* Plant Visual Metaphor */}
        <div className="relative w-64 h-64 flex items-center justify-center">
           {/* Watering Animation */}
           <AnimatePresence>
             {isWatering && (
               <motion.div 
                 initial={{ opacity: 0, x: -50, y: -50, rotate: -20 }}
                 animate={{ opacity: 1, x: 0, y: 0, rotate: -45 }}
                 exit={{ opacity: 0, x: -50, y: -50, rotate: -20 }}
                 className="absolute top-0 left-0 z-10 text-slate-600"
               >
                  <Droplets size={64} className="fill-blue-400 text-blue-500 animate-pulse" />
               </motion.div>
             )}
           </AnimatePresence>

           <motion.div 
              animate={isWatering ? { 
                scale: [1, 1.1, 1],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
              } : { 
                scale: [1, 1.05, 1],
                y: [0, -5, 0] 
              }}
              transition={{ duration: isWatering ? 1 : 4, repeat: isWatering ? 3 : Infinity }}
              className="text-9xl drop-shadow-2xl relative z-0 select-none pb-4"
           >
              {growthProgress < 25 ? '🌱' : growthProgress < 60 ? '🌿' : '🌳'}
           </motion.div>
           
           <div className="absolute bottom-6 w-32 h-16 bg-slate-100 rounded-[50%] blur-xl -z-10 opacity-50" />
        </div>

        {/* Progress System */}
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between items-end px-2">
            <div className="text-left">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Growth Level</span>
              <span className="text-2xl font-black text-growth-primary tracking-tighter">Level {Math.floor(stats.totalHours / 10) + 1}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-growth-dark tracking-tighter">{growthProgress.toFixed(0)}%</span>
            </div>
          </div>
          <div className="w-full h-5 bg-slate-50 rounded-full p-1 border border-slate-100 relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${growthProgress}%` }}
              className="h-full bg-gradient-to-r from-growth-primary to-emerald-400 rounded-full shadow-lg relative"
            >
               <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white opacity-40 animate-pulse m-0.5" />
            </motion.div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-2">
             {100 - growthProgress.toFixed(0)}% to reach next stage
          </p>
        </div>

        {/* Plant Variety Picker */}
        <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
           {['🌱', '🌵', '🌻', '🌲'].map(p => (
             <button 
               key={p}
               onClick={() => toast.success(`Metaphor updated to ${p}`)}
               className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-growth-light shadow-sm transition-all"
             >
               {p}
             </button>
           ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          id="study"
          title="Study Hours" 
          value={stats.totalHours} 
          sub="hrs" 
          icon={<BookOpen size={28} />} 
          trend={`${stats.improvement}% vs last week`} 
        />
        <StatCard 
          id="skills"
          title="Skills Practiced" 
          value="3" 
          sub="active" 
          icon={<Dumbbell size={28} />} 
          trend="Consistent" 
        />
        <StatCard 
          id="goals"
          title="Goals Completed" 
          value="8" 
          sub="total" 
          icon={<CheckCircle2 size={28} />} 
          trend="+1 from yesterday" 
        />
      </div>

      {/* Achievement Garden */}
      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-black text-growth-dark tracking-tight flex items-center gap-2">
           <Zap className="text-amber-500 fill-amber-500" size={20} />
           Achievement Garden
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { title: 'Early Sprout', desc: 'Active before 8 AM', icon: '☀️', unlocked: true },
             { title: 'Deep Roots', desc: '4hr Study Session', icon: '🪵', unlocked: true },
             { title: 'Bloom Master', desc: '10 Goals Finished', icon: '🌸', unlocked: false },
             { title: 'Forest Guard', desc: '5 Community Likes', icon: '🛡️', unlocked: false }
           ].map((badge, i) => (
             <div 
               key={i}
               className={`p-6 rounded-4xl border flex flex-col items-center text-center gap-3 transition-all ${
                 badge.unlocked 
                 ? 'bg-white border-slate-100 shadow-sm shadow-growth-primary/5' 
                 : 'bg-slate-50/50 border-slate-100 opacity-40 grayscale'
               }`}
             >
                <div className="text-3xl drop-shadow-sm">{badge.icon}</div>
                <div className="space-y-1">
                   <h4 className="text-xs font-black text-growth-dark uppercase tracking-tight">{badge.title}</h4>
                   <p className="text-[10px] text-slate-400 font-bold leading-tight">{badge.desc}</p>
                </div>
                {badge.unlocked && (
                  <div className="px-2 py-0.5 rounded-full bg-growth-primary/10 text-growth-primary text-[8px] font-black uppercase">Unlocked</div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Stat Modal Overlay */}
      <AnimatePresence>
        {activeStat && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-growth-dark/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] p-10 w-full max-w-2xl shadow-2xl relative overflow-hidden"
            >
               <button 
                onClick={() => setActiveStat(null)}
                className="absolute top-8 right-8 p-1.5 rounded-full hover:bg-slate-50 transition-colors z-10"
              >
                <X size={20} className="text-slate-400" />
              </button>

              <div className="flex items-center gap-4 mb-10">
                 <div className="w-16 h-16 rounded-3xl bg-growth-light/30 text-growth-primary flex items-center justify-center">
                    {activeStat.id === 'study' ? <BookOpen size={32} /> : activeStat.id === 'skills' ? <Dumbbell size={32} /> : <CheckCircle2 size={32} />}
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-growth-dark tracking-tight">{activeStat.title}</h2>
                    <p className="text-slate-400 font-medium">Tracking your consistency over the last 7 days.</p>
                 </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { weekday: 'short' })}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc', radius: 10 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-growth-dark text-white p-3 rounded-2xl shadow-xl border border-white/10 text-xs font-bold">
                              {payload[0].value} {activeStat.id === 'study' ? 'hrs' : 'points'}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="hours" 
                      radius={[10, 10, 10, 10]} 
                      barSize={32}
                    >
                      {dailyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === dailyData.length - 1 ? '#2D5A43' : '#E2F1E7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-10 flex gap-4">
                 <div className="flex-1 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Weekly Average</span>
                    <span className="text-xl font-black text-growth-dark">{(stats.totalHours / 7).toFixed(1)} hrs/day</span>
                 </div>
                 <div className="flex-1 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Peak Productivity</span>
                    <span className="text-xl font-black text-growth-dark">Tuesday</span>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
