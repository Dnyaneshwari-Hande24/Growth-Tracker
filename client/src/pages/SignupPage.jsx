import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Leaf } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignupPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Welcome to GrowthTrack! 🌱');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-5xl border border-slate-100 shadow-2xl shadow-growth-primary/5 flex flex-col gap-10"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 rounded-2xl bg-growth-light/50 flex items-center justify-center text-growth-primary">
                <Leaf size={28} className="fill-current" />
             </div>
          </div>
          <h1 className="text-3xl font-black text-growth-dark">Join GrowthTrack</h1>
          <p className="text-slate-400 font-medium">Start your personal growth journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                required
                type="text"
                placeholder="e.g. Dnyaneshwari"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-growth-primary/10 transition-all font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                required
                type="email"
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-growth-primary/10 transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                required
                type="password"
                placeholder="••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-growth-primary/10 transition-all font-medium"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-5 rounded-3xl bg-growth-dark text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-growth-dark/10"
          >
            {loading ? 'Planting Seeds...' : 'Create Account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-slate-400">
          Already have an account? <Link to="/login" className="text-growth-primary font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
