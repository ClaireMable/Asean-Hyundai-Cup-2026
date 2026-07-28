import React, { useState, useEffect } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { MatchesSection } from './components/MatchesSection';
import { GroupStandingsSection } from './components/GroupStandingsSection';
import { TournamentBracketSection } from './components/TournamentBracketSection';
import { StatisticsSection } from './components/StatisticsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Blokir klik kanan (Context Menu), F12, Inspect Element (Ctrl+Shift+I/C/J), dan View Source (Ctrl+U)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tombol F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element Selector)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Web Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).nodeName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF3FC] via-[#F4F8FC] to-[#E6F0FA] text-[#0F172A] font-sans selection:bg-[#0256C4] selection:text-[#FFFFFF]">
      {/* Top Header Navbar */}
      <HeaderNavbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Page Content */}
      <main>
        {/* Hero Banner with Countdown & Quick Menu */}
        <HeroSection onSelectTab={handleSelectTab} />

        {/* Matches & Prediction Schedule Grid */}
        <MatchesSection />

        {/* Group Standings (World Cup 2026 & European Top Leagues) */}
        <GroupStandingsSection />

        {/* Road to Final Tournament Bracket */}
        <TournamentBracketSection />

        {/* Statistics Section (Top Score, Tournament Stats, Top Assists) */}
        <StatisticsSection />
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
