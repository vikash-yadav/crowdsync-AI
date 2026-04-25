"use client";

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Coffee, 
  Ticket, 
  Bell, 
  MessageSquare, 
  Search, 
  User, 
  ChevronRight,
  Zap,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickAction = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <button className="flex flex-col items-center gap-3 p-4 glass-button rounded-2xl w-full group">
    <div className={`p-3 rounded-xl ${color} transition-transform group-hover:scale-110`}>
      <Icon size={24} className="text-white" />
    </div>
    <span className="text-xs font-semibold text-slate-600">{label}</span>
  </button>
);

const StatusCard = ({ label, status, waitTime, type }: { label: string, status: string, waitTime: number, type: string }) => {
  const getStatusColor = (s: string) => {
    if (s === 'critical') return 'bg-rose-500';
    if (s === 'warning') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex items-center justify-between p-4 glass-card mb-3 bg-white/40">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(status)} animate-pulse`}></div>
        <div>
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
          <Clock size={12} />
          <span>{waitTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/stadium_light.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#f8fafc] to-[#f8fafc]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto px-6 pb-24">
        
        {/* Header */}
        <header className="flex items-center justify-between py-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight gradient-text">CrowdSync</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em]">Stadium Intelligence</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 rounded-full glass-button relative">
              <Bell size={20} className="text-slate-600" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></div>
            </button>
            <button className="p-3 rounded-full glass-button">
              <User size={20} className="text-slate-600" />
            </button>
          </div>
        </header>

        {/* Digital Ticket */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group cursor-pointer mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative glass-card overflow-hidden bg-white/80 border-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Upcoming Event</p>
                  <h3 className="text-xl font-bold text-slate-800">Championship Final</h3>
                </div>
                <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                  <Ticket size={20} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Gate</p>
                  <p className="text-lg font-bold text-slate-700">A4</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Section</p>
                  <p className="text-lg font-bold text-slate-700">102</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Seat</p>
                  <p className="text-lg font-bold text-slate-700">14-F</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Activity size={14} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase">Entry Valid</span>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase group-hover:gap-2 transition-all">
                  View Ticket <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          <QuickAction icon={Navigation} label="Wayfinding" color="bg-blue-600 text-white" />
          <QuickAction icon={Coffee} label="Order Food" color="bg-amber-500 text-white" />
          <QuickAction icon={MapPin} label="Find Seat" color="bg-indigo-600 text-white" />
        </section>

        {/* Live Crowd Insights */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Crowd Insights</h3>
            <button className="text-[10px] font-bold text-blue-600 uppercase">View All</button>
          </div>
          <StatusCard label="North Concourse" status="normal" waitTime={2} type="Main Gate" />
          <StatusCard label="Slice Station (Pizza)" status="warning" waitTime={12} type="Food" />
          <StatusCard label="South Restrooms" status="critical" waitTime={8} type="Facility" />
        </section>

        {/* Floating AI Coordinator Button */}
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-24 right-6 p-4 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-600/30 z-50 group"
        >
          <MessageSquare size={24} />
        </motion.button>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 p-4 z-40">
          <div className="max-w-md mx-auto glass-card border-white bg-white/80 px-6 py-4 flex justify-between items-center shadow-xl">
            <button className="p-2 text-blue-600">
              <Zap size={20} fill="currentColor" />
            </button>
            <button className="p-2 text-slate-400">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-400">
              <Ticket size={20} />
            </button>
            <button className="p-2 text-slate-400">
              <User size={20} />
            </button>
          </div>
        </nav>

        {/* AI Chat Drawer Overlay */}
        <AnimatePresence>
          {showChat && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowChat(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 rounded-t-[2.5rem] z-[70] h-[85vh] flex flex-col shadow-2xl"
              >
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto my-4"></div>
                <div className="p-8 pt-4 flex-1">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">CrowdSync AI</h2>
                      <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Active Assistant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl rounded-tl-none border border-slate-100 max-w-[80%]">
                      <p className="text-sm leading-relaxed text-slate-600">Hello! I'm your CrowdSync Stadium Coordinator. How can I assist you today?</p>
                    </div>
                    
                    <div className="p-4 bg-blue-600 rounded-2xl rounded-tr-none border border-blue-700 ml-auto max-w-[80%] text-white">
                      <p className="text-sm leading-relaxed">Where is the shortest line for pizza?</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl rounded-tl-none border border-slate-100 max-w-[80%]">
                      <p className="text-sm leading-relaxed text-slate-600">The **Slice Station** currently has a 12-minute wait. However, **South Grill** just opened a new lane with only a 4-minute wait. Would you like directions?</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white border-t border-slate-50">
                  <div className="flex items-center gap-3 p-2 pl-6 glass-card bg-slate-50 border-slate-100 shadow-none">
                    <input 
                      type="text" 
                      placeholder="Ask the coordinator..." 
                      className="bg-transparent border-none focus:outline-none text-sm flex-1 py-2 text-slate-700"
                    />
                    <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
