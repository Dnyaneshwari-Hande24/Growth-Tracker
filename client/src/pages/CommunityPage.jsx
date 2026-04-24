import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Plus, 
  MessageCircle, 
  ShieldAlert, 
  Send,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CommunityPost = ({ post, onUpdate }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/community/like/${post._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
    } catch (error) {
      // Demo Mode Like
      const userId = 'demo_user';
      const isLiked = post.likes.includes(userId);
      const newLikes = isLiked 
        ? post.likes.filter(id => id !== userId)
        : [...post.likes, userId];
      
      const updatedPost = { ...post, likes: newLikes };
      onUpdate(updatedPost);
      toast.success(isLiked ? 'Unliked' : 'Liked! ❤️');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setIsSubmitting(true);
    const newReply = {
      content: replyContent,
      user: { name: 'You' },
      createdAt: new Date().toISOString()
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/community/reply/${post._id}`, { content: replyContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
    } catch (error) {
      const updatedPost = { 
        ...post, 
        replies: [...(post.replies || []), newReply] 
      };
      onUpdate(updatedPost);
    } finally {
      setReplyContent('');
      setIsSubmitting(false);
      toast.success('Reply planted! 🌱');
    }
  };

  const maskName = (name) => {
    if (!name) return 'Anonymous';
    return `${name.charAt(0)}${'*'.repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
  };

  return (
    <motion.div 
      layout
      className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex flex-col gap-6"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-growth-light/50 flex items-center justify-center font-bold text-growth-primary text-xs">GT</div>
          <div className="flex flex-col">
             <span className="text-xs font-black text-growth-dark uppercase tracking-widest">Growth Member</span>
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <button className="p-2 text-slate-200 hover:text-slate-400 transition-colors">
           <MoreVertical size={20} />
        </button>
      </div>

      <p className="text-lg font-medium text-growth-dark leading-relaxed">
        {post.content}
      </p>

      <div className="flex items-center gap-6 pt-2">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm font-bold transition-all ${
            post.likes.includes('demo_user') ? 'text-rose-500' : 'text-slate-300 hover:text-rose-500'
          }`}
        >
          <Heart size={20} className={post.likes.includes('demo_user') ? 'fill-current' : ''} />
          {post.likes.length}
        </button>
        <button 
          onClick={() => setShowReplies(!showReplies)}
          className={`flex items-center gap-2 text-sm font-bold transition-all ${
            showReplies ? 'text-growth-primary' : 'text-slate-300 hover:text-growth-primary'
          }`}
        >
          <MessageCircle size={20} />
          {post.replies?.length || 0}
        </button>
        <button 
          onClick={() => toast.success('Reported for review. Safe community first! 🛡️')}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-slate-300 hover:text-orange-500 hover:bg-orange-50 transition-all text-[10px] font-black uppercase tracking-widest"
        >
           <ShieldAlert size={14} />
           Report
        </button>
      </div>

      {/* Thread View */}
      <AnimatePresence>
         {showReplies && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="overflow-hidden bg-slate-50/50 rounded-3xl p-6 space-y-6"
           >
              <div className="space-y-4">
                 {post.replies?.map((reply, i) => (
                   <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[10px] font-bold text-growth-primary shrink-0">
                         {reply.user?.name?.charAt(0) || '?'}
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-growth-dark uppercase tracking-tight">{maskName(reply.user?.name)}</span>
                            <span className="text-[8px] text-slate-300 font-bold uppercase">{new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                         </div>
                         <p className="text-sm font-medium text-slate-600 leading-relaxed bg-white px-4 py-2 rounded-2xl border border-slate-100/50">
                            {reply.content}
                         </p>
                      </div>
                   </div>
                 ))}
                 
                 {(!post.replies || post.replies.length === 0) && (
                   <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest py-4">No replies yet. Be the first!</p>
                 )}
              </div>

              <form onSubmit={handleReply} className="relative mt-4">
                 <input 
                   value={replyContent}
                   onChange={(e) => setReplyContent(e.target.value)}
                   placeholder="Reply to this thread..."
                   className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-growth-primary/5 text-sm font-medium transition-all"
                 />
                 <button 
                   disabled={isSubmitting || !replyContent.trim()}
                   className="absolute right-2 top-2 p-2 rounded-xl bg-growth-primary text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all"
                 >
                    <Send size={18} />
                 </button>
              </form>
           </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
};

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (updatedPost = null) => {
    if (updatedPost) {
      setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    try {
      const { data } = await axios.get('/api/community', { signal: controller.signal });
      clearTimeout(timeoutId);
      setPosts(data);
      localStorage.setItem('cached_posts', JSON.stringify(data));
    } catch (error) {
      console.warn('Community Backend offline, using seed posts');
      const cached = localStorage.getItem('cached_posts');
      if (cached && JSON.parse(cached).length > 0) {
        setPosts(JSON.parse(cached));
      } else {
        const seedPosts = [
          {
            _id: 'seed1',
            content: "Just finished my first 4-hour deep work session! The plant on my dashboard looks so happy. 🌱✨",
            likes: ['seed_u1', 'seed_u2'],
            replies: [{ content: "Great job! Consistency is key.", user: { name: "StudyPro" }, createdAt: new Date().toISOString() }],
            createdAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            _id: 'seed2',
            content: "Welcome to the GrowthTrack community! This is a safe space to share your journey. 🍀",
            likes: ['seed_u3'],
            replies: [],
            createdAt: new Date(Date.now() - 7200000).toISOString()
          },
          {
            _id: 'seed3',
            content: "The Lo-fi beats in the sidebar are helping me focus so much today. Highly recommended! 🎧",
            likes: ['seed_u4', 'demo_user'],
            replies: [],
            createdAt: new Date(Date.now() - 10800000).toISOString()
          }
        ];
        setPosts(seedPosts);
        localStorage.setItem('cached_posts', JSON.stringify(seedPosts));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newPost = {
      _id: Date.now().toString(),
      content,
      likes: [],
      replies: [],
      createdAt: new Date().toISOString()
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/community', { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (error) {
      const updated = [newPost, ...posts];
      setPosts(updated);
      localStorage.setItem('cached_posts', JSON.stringify(updated));
    } finally {
      setContent('');
      toast.success('Post shared anonymously! 🍃');
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center font-bold text-growth-primary text-xl">Loading community garden...</div>;

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-growth-dark tracking-tight">Community</h1>
        <p className="text-slate-500 font-medium italic">Support others, share your growth anonymously.</p>
      </div>

      {/* Create Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 rounded-[50px] bg-growth-dark shadow-2xl shadow-growth-dark/30 space-y-6"
      >
        <div className="flex items-center gap-3 text-growth-light/60 uppercase text-[10px] font-black tracking-[0.2em]">
           <Plus size={14} className="animate-pulse" />
           Share a Thought Anonymously
        </div>
        <form onSubmit={handleCreatePost} className="space-y-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 bg-transparent text-white text-2xl font-medium outline-none placeholder:text-white/20 resize-none leading-relaxed"
            placeholder="What's growing in your mind today?"
          />
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
             <div className="flex gap-4">
                <button type="button" className="p-2 text-white/30 hover:text-white transition-colors">
                   <MessageSquare size={20} />
                </button>
                <div className="h-10 w-[1px] bg-white/10 mx-2" />
                <span className="text-[10px] items-center flex font-black text-growth-primary uppercase tracking-widest bg-growth-primary/10 px-3 rounded-full">Secure & Private</span>
             </div>
             <button 
               type="submit"
               disabled={!content.trim()}
               className="px-10 py-4 rounded-full bg-growth-primary text-white font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-growth-primary/20 disabled:opacity-30 disabled:hover:scale-100"
             >
               POST NOW
             </button>
          </div>
        </form>
      </motion.div>

      {/* Feed */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-xs font-black text-growth-primary uppercase tracking-[0.2em] px-2">
           <Zap size={16} fill="currentColor" />
           Recent Sprouts
        </div>
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <CommunityPost key={post._id} post={post} onUpdate={fetchPosts} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
