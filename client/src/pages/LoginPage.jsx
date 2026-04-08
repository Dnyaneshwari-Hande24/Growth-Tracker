import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Leaf } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Welcome back to your garden! 🌱');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center font-outfit">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 rounded-5xl border border-slate-100 shadow-2xl shadow-growth-primary/5 flex flex-col gap-10"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 rounded-2xl bg-growth-light/50 flex items-center justify-center text-growth-primary">
                <Leaf size={28} className="fill-current" />
             </div>
          </div>
          <h1 className="text-3xl font-black text-growth-dark tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 font-medium">Continue your growth where you left off.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
              <button type="button" className="text-[10px] font-bold text-growth-primary uppercase hover:underline">Forgot?</button>
            </div>
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
            className="w-full py-5 rounded-3xl bg-growth-dark text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-growth-dark/20"
          >
            {loading ? 'Entering...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-slate-400">
          New to the garden? <Link to="/signup" className="text-growth-primary font-bold hover:underline">Join Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
