import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Target, 
  Heart, 
  Users, 
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-white text-growth-dark font-outfit selection:bg-growth-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 sm:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="text-growth-primary fill-growth-primary" size={28} />
          <span className="text-2xl font-black tracking-tight text-growth-dark">GrowthTrack</span>
        </div>
        <div className="flex items-center gap-8">
           <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-growth-primary transition-colors">Sign In</Link>
           <Link to="/signup" className="px-6 py-3 rounded-full bg-growth-dark text-white text-sm font-bold hover:scale-105 transition-all shadow-xl shadow-growth-dark/10">Start Growing</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center">
        <motion.div
           initial="hidden"
           animate="visible"
           variants={containerVariants}
           className="space-y-12"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-growth-light/50 border border-growth-primary/10 text-growth-primary text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} className="fill-current" />
            Redefining Self-Performance
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto">
            Compete with <span className="text-growth-primary">who you were</span> yesterday.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            A mental-health-friendly space to grow your skills, habits, and mindset—without the toxic comparison.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
             <Link to="/signup" className="w-full sm:w-auto px-10 py-5 rounded-[40px] bg-growth-dark text-white text-lg font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-growth-dark/20 group">
                Plant Your First Goal
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <button className="w-full sm:w-auto px-10 py-5 rounded-[40px] bg-slate-50 text-slate-600 text-lg font-black border border-slate-100 hover:bg-white transition-all">
                How it works
             </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 sm:px-12 bg-slate-50/50">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { 
                   title: 'Growth Garden', 
                   desc: 'Visualize your progress with a dynamic plant that grows as you complete goals.', 
                   icon: <Leaf className="text-growth-primary" />,
                   bg: 'bg-growth-light/30'
                 },
                 { 
                   title: 'Mindset Toolkit', 
                   desc: 'From Box Breathing to Pomodoro—tools to keep your mental garden nurtured.', 
                   icon: <Heart className="text-rose-500" />,
                   bg: 'bg-rose-50'
                 },
                 { 
                   title: 'Safe Community', 
                   desc: 'Connect anonymously with others on the same journey. No leaderboards, just support.', 
                   icon: <Users className="text-blue-500" />,
                   bg: 'bg-blue-50'
                 }
               ].map((feature, i) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-10 rounded-[50px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                 >
                    <div className={`w-16 h-16 rounded-[22px] ${feature.bg} flex items-center justify-center mb-8`}>
                       {React.cloneElement(feature.icon, { size: 32 })}
                    </div>
                    <h3 className="text-2xl font-black text-growth-dark mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Philosophical Section */}
      <section className="py-32 px-6 sm:px-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
               <h2 className="text-5xl font-black tracking-tight leading-tight">
                  No public <span className="text-slate-300 line-through">leaderboards.</span><br />
                  Just personal <span className="text-growth-primary">evolution.</span>
               </h2>
               <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  Most platforms focus on how you rank against others. GrowthTrack is different. We focus on how far you've come from your own starting point.
               </p>
               <div className="space-y-4">
                  {[
                    { text: 'Compare today with yesterday', icon: <TrendingUp size={20} /> },
                    { text: 'Nurture your mental well-being', icon: <Heart size={20} /> },
                    { text: 'Stay consistent, not perfect', icon: <Zap size={20} /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-lg font-bold text-growth-dark">
                       <div className="w-8 h-8 rounded-full bg-growth-light/50 flex items-center justify-center text-growth-primary">
                          {item.icon}
                       </div>
                       {item.text}
                    </div>
                  ))}
               </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
               <div className="relative w-full max-w-md aspect-square rounded-[60px] bg-white border border-slate-100 shadow-2xl flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="text-[180px] drop-shadow-2xl"
                  >
                    🌿
                  </motion.div>
                  <div className="absolute -bottom-10 -right-10 p-8 rounded-[40px] bg-growth-dark text-white shadow-2xl animate-bounce">
                     <ShieldCheck size={40} />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-6 sm:px-12 text-center bg-growth-dark text-white rounded-t-[100px]">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
         >
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight">Ready to nurture <br /> your growth?</h2>
            <Link to="/signup" className="inline-flex px-12 py-6 rounded-full bg-growth-primary text-white text-xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-growth-primary/40">
               Join GrowthTrack Today
            </Link>
            <p className="text-growth-light/40 font-bold uppercase tracking-widest text-xs">Free forever. Community driven. Student focused.</p>
         </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
