import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  Brain, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  X,
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const MentalHealthPage = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [worry, setWorry] = useState('');
  const [realityCheck, setRealityCheck] = useState(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Breathing Animation Props
  const breathingVariants = {
    inhale: { scale: 1.5, opacity: 0.8, transition: { duration: 4, ease: "easeInOut" } },
    hold: { scale: 1.5, opacity: 1, transition: { duration: 4 } },
    exhale: { scale: 1, opacity: 0.5, transition: { duration: 4, ease: "easeInOut" } }
  };

  // Pomodoro Logic
  useEffect(() => {
    let interval;
    if (timerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setTimerRunning(false);
      toast.success('Session complete! Time for a well-deserved break. 🌱');
    }
    return () => clearInterval(interval);
  }, [timerRunning, pomodoroTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startRealityCheck = () => {
    if (!worry.trim()) return;
    
    const insights = [
      "Your worth isn't tied to your productivity. You are enough as you are.",
      "One bad day doesn't equal a bad life. Take a breath and start small tomorrow.",
      "Consistency beats perfection. Even 5 minutes of study is a win.",
      "Take a moment to look at how far you've come. The plant on your dashboard is proof of your effort!",
      "It's okay to rest. Growth happens in the quiet moments too.",
      "Everyone's timeline is different. Comparing your Chapter 1 to someone else's Chapter 20 isn't fair to yourself.",
      "You have survived 100% of your hardest days. You've got this.",
      "A lapse in productivity isn't a failure—it's a signal to recharge."
    ];
    
    setRealityCheck({
      original: worry,
      reframe: insights[Math.floor(Math.random() * insights.length)]
    });
    setWorry('');
  };

  const GrowthLessons = [
    {
      id: 'pomodoro',
      title: 'Pomodoro Power',
      desc: 'Master deep focus with 25-minute intervals.',
      icon: <Clock className="text-orange-500" size={24} />,
      type: 'timer'
    },
    {
      id: 'stoic',
      title: 'Stoic Pivot',
      desc: 'Turn academic setbacks into active growth.',
      icon: <Brain className="text-blue-500" size={24} />,
      type: 'content'
    },
    {
      id: 'gratitude',
      title: 'Gratitude Bloom',
      desc: 'Record 3 daily wins to nurture your mind.',
      icon: <Sparkles className="text-purple-500" size={24} />,
      type: 'journal'
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-growth-dark tracking-tight">Well-being</h1>
        <p className="text-slate-500 font-medium">Nurture your mind as much as your skills.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Breathing Exercise Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-5xl bg-white border border-slate-100 shadow-sm flex flex-col items-center gap-8 relative overflow-hidden h-[500px]"
        >
          <div className="flex flex-col items-center text-center gap-2">
            <Wind className="text-growth-primary animate-pulse" size={32} />
            <h2 className="text-3xl font-black text-growth-dark">Simple Grounding</h2>
            <p className="text-slate-400 italic text-sm">Box Breathing: Inhale • Hold • Exhale • Hold</p>
          </div>

          <div className="flex-1 flex items-center justify-center relative w-full">
            <motion.div 
              animate={activeSession === 'breathing' ? ["inhale", "hold", "exhale", "hold"] : { scale: 1 }}
              variants={breathingVariants}
              className="w-40 h-40 rounded-3xl bg-growth-light/50 border-4 border-growth-primary/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xs font-black text-growth-primary uppercase tracking-widest">
                 {activeSession === 'breathing' ? 'Breathing...' : ''}
               </span>
            </div>
          </div>

          <button 
            onClick={() => setActiveSession(activeSession === 'breathing' ? null : 'breathing')}
            className={`w-full py-5 rounded-3xl font-bold transition-all shadow-xl ${
              activeSession === 'breathing' 
              ? 'bg-slate-100 text-slate-500' 
              : 'bg-growth-dark text-white shadow-growth-dark/20'
            }`}
          >
            {activeSession === 'breathing' ? 'STOP SESSION' : 'START SESSION'}
          </button>
        </motion.div>

        {/* Reality Check Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-5xl bg-white border border-slate-100 shadow-sm flex flex-col gap-8 h-[500px]"
        >
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
               <Brain size={24} />
             </div>
             <h2 className="text-2xl font-black text-growth-dark">Reality Check</h2>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed">
            Feeling stuck? Enter your current worry to look at the facts and reframe your perspective.
          </p>

          <div className="flex-1 space-y-4">
             <textarea 
               value={worry}
               onChange={(e) => setWorry(e.target.value)}
               placeholder="e.g. 'I feel like I'm not studying enough compared to others'"
               className="w-full h-32 p-6 rounded-3xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-growth-primary/5 transition-all text-sm font-medium resize-none"
             />
             <button 
               onClick={startRealityCheck}
               className="w-full py-5 rounded-3xl bg-growth-primary text-white font-bold shadow-xl shadow-growth-primary/30 active:scale-95 transition-all"
             >
               REFRAME THOUGHT
             </button>
          </div>
        </motion.div>
      </div>

      {/* Growth Lessons Section */}
      <div className="mt-12 space-y-8">
        <h3 className="text-2xl font-black text-growth-dark tracking-tight flex items-center gap-3">
          <BookOpen className="text-growth-primary" size={28} />
          Growth Lessons
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {GrowthLessons.map((lesson) => (
             <motion.div
               key={lesson.id}
               whileHover={{ y: -5 }}
               className="p-8 rounded-4xl bg-white border border-slate-100 shadow-sm flex flex-col gap-6 group"
             >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-growth-light/30 transition-colors">
                   {lesson.icon}
                </div>
                <div className="space-y-2">
                   <h4 className="text-lg font-bold text-growth-dark">{lesson.title}</h4>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed">{lesson.desc}</p>
                </div>
                <button 
                  onClick={() => setActiveSession(lesson.id)}
                  className="mt-2 py-3 px-6 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:border-growth-primary hover:text-growth-primary transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={14} className="fill-current" />
                  Start Lesson
                </button>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Session Modals */}
      <AnimatePresence>
        {activeSession === 'pomodoro' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-growth-dark/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-5xl p-12 w-full max-w-md shadow-2xl relative text-center space-y-10"
            >
              <button 
                onClick={() => { setActiveSession(null); setTimerRunning(false); }}
                className="absolute top-8 right-8 p-1 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-growth-dark">Pomodoro Power</h2>
                <p className="text-slate-400 font-medium">Focused growth, one interval at a time.</p>
              </div>

              <div className="text-7xl font-black text-growth-primary tracking-tighter tabular-nums drop-shadow-sm py-8 bg-growth-light/20 rounded-4xl">
                {formatTime(pomodoroTime)}
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setTimerRunning(!timerRunning)}
                   className={`flex-1 py-5 rounded-3xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 ${
                     timerRunning 
                     ? 'bg-slate-100 text-slate-500' 
                     : 'bg-growth-dark text-white shadow-growth-dark/20 hover:scale-[1.02]'
                   }`}
                 >
                   {timerRunning ? <RotateCcw size={20} /> : <Play size={20} />}
                   {timerRunning ? 'PAUSE' : 'START FOCUS'}
                 </button>
                 <button 
                   onClick={() => { setPomodoroTime(25 * 60); setTimerRunning(false); }}
                   className="p-5 rounded-3xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-growth-primary transition-colors"
                 >
                   <RotateCcw size={24} />
                 </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Stoic Pivot Lesson Modal */}
        {activeSession === 'stoic' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-growth-dark/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-5xl p-12 w-full max-w-lg shadow-2xl relative space-y-6"
            >
              <button 
                onClick={() => setActiveSession(null)}
                className="absolute top-8 right-8 p-1 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
              
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                 <Brain size={24} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-growth-dark">The Stoic Pivot</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">"It's not what happens to you, but how you react to it that matters."</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                 <p className="text-sm font-bold text-growth-dark">Lesson 1: Control what you can.</p>
                 <p className="text-xs text-slate-500 leading-relaxed">Focus your energy on your **actions** and **character**. Let go of the exam results or other people's opinions. They are the 'wind'—you are the 'sail'.</p>
              </div>

              <button 
                onClick={() => { toast.success('Wisdom internalized! 🌱'); setActiveSession(null); }}
                className="w-full py-4 rounded-2xl bg-growth-dark text-white font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-growth-dark/10"
              >
                I AM CALM & FOCUSED
              </button>
            </motion.div>
          </div>
        )}

        {/* Gratitude Bloom Lesson Modal */}
        {activeSession === 'gratitude' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-growth-dark/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-5xl p-12 w-full max-w-lg shadow-2xl relative space-y-8 text-center"
            >
              <button 
                onClick={() => setActiveSession(null)}
                className="absolute top-8 right-8 p-1 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
              
              <div className="flex justify-center">
                 <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                   <Sparkles size={32} />
                 </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-growth-dark">Gratitude Bloom</h2>
                <p className="text-slate-400 font-medium">What good things sprouted in your garden today?</p>
              </div>

              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <input 
                     key={i}
                     placeholder={`Good thing #${i}...`}
                     className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-purple-500/5 font-medium transition-all text-sm"
                   />
                 ))}
              </div>

              <button 
                onClick={() => { toast.success('Your mental garden is blooming! 🌸'); setActiveSession(null); }}
                className="w-full py-5 rounded-3xl bg-purple-600 text-white font-bold shadow-xl shadow-purple-600/20 hover:scale-[1.02] transition-transform"
              >
                FINISH JOURNALING
              </button>
            </motion.div>
          </div>
        )}

        {realityCheck && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-growth-dark/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-5xl p-12 w-full max-w-2xl shadow-2xl relative space-y-10"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-growth-light/50 text-growth-primary flex items-center justify-center mb-6">
                   <Sparkles size={24} />
                </div>
                <h2 className="text-3xl font-black text-growth-dark">A New Perspective</h2>
                <p className="text-slate-400 font-medium">Reframing the thought for better growth.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                 <div className="p-8 rounded-4xl bg-slate-50 border border-slate-100 space-y-3">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Initial Thought</span>
                    <p className="text-sm font-medium text-slate-500 italic">"{realityCheck.original}"</p>
                 </div>
                 <div className="p-8 rounded-4xl bg-growth-primary/5 border-2 border-growth-primary/10 space-y-3 relative overflow-hidden">
                    <Sparkles className="absolute -top-2 -right-2 text-growth-primary opacity-10" size={80} />
                    <span className="text-[10px] font-black text-growth-primary uppercase tracking-widest">Balanced Fact</span>
                    <p className="text-base font-bold text-growth-dark leading-relaxed">{realityCheck.reframe}</p>
                 </div>
              </div>

              <button 
                onClick={() => setRealityCheck(null)}
                className="w-full py-5 rounded-3xl bg-growth-dark text-white font-bold shadow-xl shadow-growth-dark/20 hover:scale-[1.02] transition-transform"
              >
                I FEEL BETTER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentalHealthPage;
