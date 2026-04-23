import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Components
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import GoalsPage from './pages/GoalsPage';
import MentalHealthPage from './pages/MentalHealthPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';

function App() {
  const [user, setUser] = useState({ 
    name: 'GrowthTrack Admin', 
    email: 'admin@growthtrack.com',
    id: 'dummy_id' 
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Auth is now bypassed. Always staying logged in.
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-900' : 'bg-growth-bg'} font-outfit`}>
      {user && (
        <Sidebar 
          user={user} 
          setUser={setUser} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      )}

      <main className={`${user ? 'pl-64 pr-8 py-8' : ''} transition-all duration-300`}>
        <div className={`${user ? 'max-w-7xl mx-auto' : ''}`}>
          <Routes>
            {/* Home / Marketing */}
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
            
            {/* Auth */}
            <Route path="/login" element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <SignupPage setUser={setUser} /> : <Navigate to="/dashboard" />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/goals" element={user ? <GoalsPage /> : <Navigate to="/login" />} />
            <Route path="/mental-health" element={user ? <MentalHealthPage /> : <Navigate to="/login" />} />
            <Route path="/community" element={user ? <CommunityPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
