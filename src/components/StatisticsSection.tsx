import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Trophy, Target, Shield, Flame } from 'lucide-react';
import { TOP_SCORERS, TOP_ASSISTS } from '../data/affData';
import { PlayerStat } from '../types';
import { FlagIcon } from './FlagIcon';

const getPlayerInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  if (parts.length === 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getMatchesFromPlayer = (p: PlayerStat) => {
  if ((p as any).matches !== undefined && (p as any).matches !== 99) return (p as any).matches;
  if (p.note) {
    const m = p.note.match(/dari\s*(\d+)\s*Pertandingan/i);
    if (m) return parseInt(m[1], 10);
    if (p.note.toLowerCase().includes('hattrick') || p.note.toLowerCase().includes('brace')) {
      return 1;
    }
  }
  // Default guesses based on tournament facts
  if (p.goals === 3) return 1;
  if (p.goals === 2) {
    if (p.name.includes('Đỗ Hoàng Hên')) return 2;
    if (p.name.includes('Paulo Josué')) return 1;
    if (p.name.includes('Than Paing')) return 1;
    if (p.name.includes('Ilhan Fandi')) return 2;
    return 2;
  }
  return 2;
};

const sortPlayers = (list: PlayerStat[], isGoals: boolean) => {
  const sorted = [...list].sort((a, b) => {
    const valA = isGoals ? a.goals : (a.assists || 0);
    const valB = isGoals ? b.goals : (b.assists || 0);
    if (valB !== valA) {
      return valB - valA;
    }
    const matchesA = getMatchesFromPlayer(a);
    const matchesB = getMatchesFromPlayer(b);
    return matchesA - matchesB;
  });
  return sorted.map((p, idx) => {
    const mCount = getMatchesFromPlayer(p);
    let noteText = '';
    if (isGoals) {
      noteText = `${p.goals} Goal${p.goals > 1 ? 's' : ''} - ${mCount} Match${mCount > 1 ? 's' : ''}`;
    } else {
      const assists = p.assists || 0;
      noteText = `${assists} Assist${assists > 1 ? 's' : ''} - ${mCount} Match${mCount > 1 ? 's' : ''}`;
    }
    return { ...p, rank: idx + 1, note: noteText };
  });
};

const PlayerInitialsAvatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ name, size = 'sm', className = '' }) => {
  const initials = getPlayerInitials(name);
  if (size === 'lg') {
    return (
      <div className={`mx-auto h-24 w-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0070FF] via-[#0256C4] to-[#0A1329] text-3xl font-black text-white border-4 border-[#0070FF] shadow-[0_0_30px_rgba(0,112,255,0.7)] transition-all duration-300 hover:scale-105 hover:border-[#38BDF8] hover:shadow-[0_0_50px_rgba(56,189,248,0.9)] select-none shrink-0 ${className}`}>
        {initials}
      </div>
    );
  }
  if (size === 'md') {
    return (
      <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0070FF] to-[#0A1329] text-xs sm:text-sm font-black text-white border border-[#0070FF]/60 group-hover:border-[#38BDF8] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.7)] transition-all select-none shrink-0 ${className}`}>
        {initials}
      </div>
    );
  }
  return (
    <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0256C4] to-[#0A1329] text-xs font-black text-white border border-[#0256C4]/40 group-hover:border-[#0256C4] shadow-sm transition-all select-none shrink-0 ${className}`}>
      {initials}
    </div>
  );
};

const parseESPNStats = (espnData: any) => {
  if (!espnData) return null;
  
  let goalsList: any[] = [];
  let assistsList: any[] = [];
  
  if (espnData.stats) {
    const statsArr = Array.isArray(espnData.stats) ? espnData.stats : Object.values(espnData.stats);
    const goalsItem = statsArr.find((s: any) => s.name === 'goalsLeaders' || s.name?.toLowerCase().includes('goal') || s.displayName?.toLowerCase().includes('goal'));
    const assistsItem = statsArr.find((s: any) => s.name === 'assistsLeaders' || s.name?.toLowerCase().includes('assist') || s.displayName?.toLowerCase().includes('assist'));
    if (goalsItem) goalsList = goalsItem.leaders || [];
    if (assistsItem) assistsList = assistsItem.leaders || [];
  } else {
    const categories = espnData?.categories || [];
    categories.forEach((cat: any) => {
      const catName = cat.name?.toLowerCase() || '';
      const displayName = cat.displayName?.toLowerCase() || '';
      if (catName === 'goals' || catName === 'points' || catName === 'scorers' || displayName.includes('scorer') || displayName.includes('goal')) {
        goalsList = cat.leaders || [];
      } else if (catName === 'assists' || displayName.includes('assist')) {
        assistsList = cat.leaders || [];
      }
    });
  }
  
  const flagMap: Record<string, string> = {
    'Indonesia': '🇲🇨', 'Malaysia': '🇲🇾', 'Vietnam': '🇻🇳', 'Thailand': '🇹🇭',
    'Singapore': '🇸🇬', 'Singapura': '🇸🇬', 'Myanmar': '🇲🇲', 'Laos': '🇱🇦',
    'Cambodia': '🇰🇭', 'Kamboja': '🇰🇭', 'Philippines': '🇵🇭', 'Filipina': '🇵🇭',
    'Timor-Leste': '🇹🇱', 'Timor Leste': '🇹🇱', 'Brunei': '🇧🇳'
  };

  const mapLeaders = (leaders: any[], isGoals: boolean): PlayerStat[] => {
    return leaders.map((leader: any, idx: number) => {
      const athlete = leader.athlete;
      let teamName = athlete?.team?.displayName || athlete?.team?.name || 'Unknown';
      let val = parseInt(leader.value?.toString() || '0', 10);
      let playerName = athlete?.displayName || athlete?.fullName || 'Pemain';
      let customMatches: number | undefined = undefined;

      // Handle ESPN API Mitchell Lee Baker placeholder for Ramadhan Sananta
      if (playerName.includes('Mitchell') && playerName.includes('Baker')) {
        playerName = 'Ramadhan Sananta';
        teamName = 'Indonesia';
      }

      // Sync completed Malaysia vs Laos results
      if (playerName.includes('Paulo Josu')) {
        if (isGoals) {
          val = 3; // 2 goals vs Myanmar + 1 goal vs Laos
          customMatches = 2;
        }
      }

      if (playerName.includes('Arif Aiman') || playerName.includes('Faisal Halim')) {
        customMatches = 2;
      }

      let note = '';
      if (isGoals && leader.displayValue) {
        const matchesMatch = leader.displayValue.match(/Matches:\s*(\d+)/i);
        if (matchesMatch) {
          const mCount = customMatches !== undefined ? customMatches : parseInt(matchesMatch[1], 10);
          note = `Total ${val} Gol dari ${mCount} Pertandingan`;
        }
      } else if (!isGoals && leader.displayValue) {
        const matchesMatch = leader.displayValue.match(/Matches:\s*(\d+)/i);
        if (matchesMatch) {
          const mCount = customMatches !== undefined ? customMatches : parseInt(matchesMatch[1], 10);
          note = `Total ${val} Assist dari ${mCount} Pertandingan`;
        }
      }
      if (!note && leader.note) {
        note = leader.note;
      }
      
      const returnObj = {
        rank: idx + 1,
        name: playerName,
        country: teamName === 'Unknown' ? 'Pemain' : teamName,
        flag: flagMap[teamName] || '🏆',
        avatar: athlete?.headshot?.href || '',
        goals: isGoals ? val : 0,
        assists: !isGoals ? val : 0,
        totalGA: val,
        note: note
      };

      if (customMatches !== undefined) {
        (returnObj as any).matches = customMatches;
      }

      return returnObj;
    });
  };
  
  return {
    scorers: goalsList.length > 0 ? mapLeaders(goalsList, true) : null,
    assists: assistsList.length > 0 ? mapLeaders(assistsList, false) : null
  };
};

export const StatisticsSection: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStat | null>(null);
  const [modalType, setModalType] = useState<'score' | 'assist' | null>(null);

  const [liveScorers, setLiveScorers] = useState<PlayerStat[] | null>(null);
  const [liveAssists, setLiveAssists] = useState<PlayerStat[] | null>(null);
  const [liveTournamentStats, setLiveTournamentStats] = useState<{ matches: number; goals: number; yellow: number; red: number } | null>(null);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const statsRes = await fetch('/api/espn/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          const parsed = parseESPNStats(statsData);
          if (parsed) {
            if (parsed.scorers) setLiveScorers(parsed.scorers);
            if (parsed.assists) setLiveAssists(parsed.assists);
          }
        }
      } catch (err) {
        console.error("Error fetching live stats:", err);
      }

      try {
        const sbRes = await fetch('/api/espn/scoreboard');
        if (sbRes.ok) {
          const sbData = await sbRes.json();
          if (sbData && sbData.events) {
            let totalMatches = sbData.events.length;
            let totalGoals = 0;
            sbData.events.forEach((ev: any) => {
              const competitors = ev.competitions?.[0]?.competitors || [];
              competitors.forEach((comp: any) => {
                totalGoals += parseInt(comp.score || '0', 10);
              });
            });
            
            if (totalMatches > 0) {
              setLiveTournamentStats({
                matches: Math.max(8, totalMatches),
                goals: Math.max(35, totalGoals),
                yellow: 18,
                red: 1
              });
            }
          }
        }
      } catch (err) {
        console.error("Error fetching live scoreboard stats:", err);
      }
    };

    fetchStatsData();
    const interval = setInterval(fetchStatsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const scorersList = sortPlayers(liveScorers || TOP_SCORERS, true);
  const assistsList = sortPlayers(liveAssists || TOP_ASSISTS, false);
  const matchesCount = liveTournamentStats ? liveTournamentStats.matches : 8;
  const goalsCount = liveTournamentStats ? liveTournamentStats.goals : 35;
  const yellowCount = liveTournamentStats ? liveTournamentStats.yellow : 18;
  const redCount = liveTournamentStats ? liveTournamentStats.red : 1;

  return (
    <section id="statistik" className="bg-transparent py-10 border-t border-[#0256C4]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Column 1: TOP SCORE */}
          <div className="rounded-3xl border border-[#0256C4]/30 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between h-full shadow-[0_12px_30px_-5px_rgba(2,86,196,0.15),_0_4px_12px_-2px_rgba(15,23,42,0.06),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(2,86,196,0.22),_0_8px_16px_-2px_rgba(15,23,42,0.08),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.12)] hover:-translate-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1.5 rounded-full bg-[#0256C4] shadow-[0_0_8px_rgba(2,86,196,0.4)]" />
                <h3 className="text-sm sm:text-base font-black italic text-[#0F172A] font-heading">
                  TOP SCORE
                </h3>
              </div>
              <button
                onClick={() => setModalType('score')}
                className="flex items-center gap-1 rounded-lg border border-[#0256C4]/30 bg-[#EEF5FC] px-2.5 py-1 text-[10px] font-black text-[#0256C4] hover:bg-[#0256C4] hover:text-[#FFFFFF] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(2,86,196,0.3)] cursor-pointer"
              >
                <span>LIHAT SEMUA</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col justify-between mt-3">
              {scorersList.slice(0, 6).map((player) => (
                <button
                  key={player.rank}
                  onClick={() => setSelectedPlayer(player)}
                  className="w-full flex items-center justify-between rounded-xl border border-[#0256C4]/20 bg-gradient-to-b from-[#FFFFFF] to-[#F1F5F9] py-1.5 px-2.5 shadow-[0_4px_10px_-2px_rgba(2,86,196,0.08),_inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-1px_2px_rgba(2,86,196,0.05)] transition-all duration-200 hover:border-[#0256C4]/60 hover:bg-gradient-to-b hover:from-[#FFFFFF] hover:to-[#EEF5FC] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_8px_20px_-2px_rgba(2,86,196,0.2),_inset_0_1px_2px_rgba(255,255,255,1)] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-score font-black text-[#0256C4] w-5 text-center shrink-0">
                      {player.rank}
                    </span>
                    <PlayerInitialsAvatar name={player.name} size="sm" />
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0F172A] group-hover:text-[#0256C4] transition-colors leading-tight">
                        {player.name}
                      </div>
                      <div className="text-[10px] font-bold text-[#64748B] flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <FlagIcon flag={player.flag} country={player.country} className="h-3.5 w-5.5 object-fill rounded shadow-sm border border-slate-300" />
                        <span>{player.country}</span>
                        {player.note && <span className="text-[9px] text-[#0256C4] font-semibold bg-[#EEF5FC] px-1.5 py-0.5 rounded border border-[#0256C4]/20">({player.note})</span>}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-lg bg-gradient-to-r from-[#0047AB] to-[#0256C4] px-2.5 py-1 text-[11px] font-score font-black text-[#FFFFFF] shadow-[0_2px_6px_rgba(2,86,196,0.3),_inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:bg-[#1D4ED8] transition-all">
                    {player.goals} Gol
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: STATISTIK TURNAMEN */}
          <div className="rounded-3xl border border-[#0256C4]/30 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between h-full shadow-[0_12px_30px_-5px_rgba(2,86,196,0.15),_0_4px_12px_-2px_rgba(15,23,42,0.06),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(2,86,196,0.22),_0_8px_16px_-2px_rgba(15,23,42,0.08),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.12)] hover:-translate-y-1">
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2.5">
              <div className="h-5 w-1.5 rounded-full bg-[#0256C4] shadow-[0_0_8px_rgba(2,86,196,0.4)]" />
              <h3 className="text-sm sm:text-base font-black italic text-[#0F172A] font-heading">
                STATISTIK TURNAMEN
              </h3>
            </div>

            {/* Content Wrapper to stretch components seamlessly */}
            <div className="flex-1 flex flex-col justify-between mt-3 space-y-3">
              {/* 4 Stat Boxes Grid */}
              <div className="grid grid-cols-2 gap-2.5 flex-1 items-stretch">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#0256C4]/25 bg-gradient-to-b from-[#FFFFFF] to-[#EEF5FC] py-2 px-3 text-center transition-all duration-300 shadow-[0_6px_15px_-2px_rgba(2,86,196,0.1),_inset_0_2px_3px_rgba(255,255,255,1),_inset_0_-2px_3px_rgba(2,86,196,0.06)] hover:border-[#0256C4]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-3px_rgba(2,86,196,0.25),_inset_0_2px_3px_rgba(255,255,255,1)] cursor-pointer group h-full">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">🏟️</span>
                  <span className="text-2xl font-black text-[#0F172A] font-score leading-tight mt-0.5">{matchesCount}</span>
                  <span className="text-[9px] font-extrabold text-[#0256C4] tracking-wider uppercase mt-0.5">
                    PERTANDINGAN
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#0256C4]/25 bg-gradient-to-b from-[#FFFFFF] to-[#EEF5FC] py-2 px-3 text-center transition-all duration-300 shadow-[0_6px_15px_-2px_rgba(2,86,196,0.1),_inset_0_2px_3px_rgba(255,255,255,1),_inset_0_-2px_3px_rgba(2,86,196,0.06)] hover:border-[#0256C4]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-3px_rgba(2,86,196,0.25),_inset_0_2px_3px_rgba(255,255,255,1)] cursor-pointer group h-full">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">⚽</span>
                  <span className="text-2xl font-black text-[#0256C4] font-score leading-tight mt-0.5">{goalsCount}</span>
                  <span className="text-[9px] font-extrabold text-[#0256C4] tracking-wider uppercase mt-0.5">
                    GOL
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/25 bg-gradient-to-b from-[#FFFFFF] to-[#FFF1F2] py-2 px-3 text-center transition-all duration-300 shadow-[0_6px_15px_-2px_rgba(244,63,94,0.1),_inset_0_2px_3px_rgba(255,255,255,1),_inset_0_-2px_3px_rgba(244,63,94,0.06)] hover:border-rose-500/60 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-3px_rgba(244,63,94,0.25),_inset_0_2px_3px_rgba(255,255,255,1)] cursor-pointer group h-full">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">🟥</span>
                  <span className="text-2xl font-black text-rose-600 font-score leading-tight mt-0.5">{redCount}</span>
                  <span className="text-[9px] font-extrabold text-[#0256C4] tracking-wider uppercase mt-0.5">
                    KARTU MERAH
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#0256C4]/25 bg-gradient-to-b from-[#FFFFFF] to-[#EEF5FC] py-2 px-3 text-center transition-all duration-300 shadow-[0_6px_15px_-2px_rgba(2,86,196,0.1),_inset_0_2px_3px_rgba(255,255,255,1),_inset_0_-2px_3px_rgba(2,86,196,0.06)] hover:border-[#0256C4]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-3px_rgba(2,86,196,0.25),_inset_0_2px_3px_rgba(255,255,255,1)] cursor-pointer group h-full">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">🧤</span>
                  <span className="text-2xl font-black text-[#0F172A] font-score leading-tight mt-0.5">4</span>
                  <span className="text-[9px] font-extrabold text-[#0256C4] tracking-wider uppercase mt-0.5">
                    CLEAN SHEET
                  </span>
                </div>
              </div>

              {/* Official Kapsul4D Banner Box */}
              <a
                href="https://shortq.net/login-kapsul4d"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-2xl border border-[#0256C4] bg-gradient-to-r from-[#002B80] via-[#0140A8] to-[#0256C4] py-3 px-4 text-center space-y-1 shadow-[0_8px_20px_-3px_rgba(2,86,196,0.3),_inset_0_1px_2px_rgba(255,255,255,0.25)] text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_28px_-2px_rgba(2,86,196,0.5)] cursor-pointer"
              >
                <div className="inline-block rounded-full bg-[#FFFFFF] px-2.5 py-0.5 text-[9px] font-black text-[#002B80] shadow-sm">
                  OFFICIAL KAPSUL4D
                </div>
                <h4 className="text-base font-black italic tracking-wider text-[#FFFFFF] font-heading drop-shadow-sm">
                  THE DREAM IS REAL
                </h4>
                <p className="text-[9px] text-[#E0F2FE] uppercase tracking-widest leading-tight">
                  ONE ASEAN. ONE TROPHY. ONE ZONE OF DREAMS.
                </p>
                <div className="text-[9px] font-bold text-[#60A5FA] pt-0.5">LIVE UPDATE 2026 • KLIK UNTUK LOGIN</div>
              </a>
            </div>
          </div>

          {/* Column 3: TOP ASSISTS */}
          <div className="rounded-3xl border border-[#0256C4]/30 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between h-full shadow-[0_12px_30px_-5px_rgba(2,86,196,0.15),_0_4px_12px_-2px_rgba(15,23,42,0.06),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(2,86,196,0.22),_0_8px_16px_-2px_rgba(15,23,42,0.08),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(2,86,196,0.12)] hover:-translate-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1.5 rounded-full bg-[#0256C4] shadow-[0_0_8px_rgba(2,86,196,0.4)]" />
                <h3 className="text-sm sm:text-base font-black italic text-[#0F172A] font-heading">
                  TOP ASSISTS
                </h3>
              </div>
              <button
                onClick={() => setModalType('assist')}
                className="flex items-center gap-1 rounded-lg border border-[#0256C4]/30 bg-[#EEF5FC] px-2.5 py-1 text-[10px] font-black text-[#0256C4] hover:bg-[#0256C4] hover:text-[#FFFFFF] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(2,86,196,0.3)] cursor-pointer"
              >
                <span>LIHAT SEMUA</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col justify-between mt-3">
              {assistsList.slice(0, 6).map((player) => (
                <button
                  key={player.rank}
                  onClick={() => setSelectedPlayer(player)}
                  className="w-full flex items-center justify-between rounded-xl border border-[#0256C4]/20 bg-gradient-to-b from-[#FFFFFF] to-[#F1F5F9] py-1.5 px-2.5 shadow-[0_4px_10px_-2px_rgba(2,86,196,0.08),_inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-1px_2px_rgba(2,86,196,0.05)] transition-all duration-200 hover:border-[#0256C4]/60 hover:bg-gradient-to-b hover:from-[#FFFFFF] hover:to-[#EEF5FC] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_8px_20px_-2px_rgba(2,86,196,0.2),_inset_0_1px_2px_rgba(255,255,255,1)] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-score font-black text-[#0256C4] w-5 text-center shrink-0">
                      {player.rank}
                    </span>
                    <PlayerInitialsAvatar name={player.name} size="sm" />
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0F172A] group-hover:text-[#0256C4] transition-colors leading-tight">
                        {player.name}
                      </div>
                      <div className="text-[10px] font-bold text-[#64748B] flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <FlagIcon flag={player.flag} country={player.country} className="h-3.5 w-5.5 object-fill rounded shadow-sm border border-slate-300" />
                        <span>{player.country}</span>
                        {player.note && <span className="text-[9px] text-[#0256C4] font-semibold bg-[#EEF5FC] px-1.5 py-0.5 rounded border border-[#0256C4]/20">({player.note})</span>}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-lg bg-gradient-to-r from-[#0047AB] to-[#0256C4] px-2.5 py-1 text-[11px] font-score font-black text-[#FFFFFF] shadow-[0_2px_6px_rgba(2,86,196,0.3),_inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:bg-[#1D4ED8] transition-all">
                    {player.assists} Assist
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Top 10 Score / Top 10 Assist Modal (Poin 4: Dipisahkan, bukan keduanya Top 20) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/75 p-4 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl my-8 rounded-3xl border-2 border-[#0070FF] bg-[#0A1329] text-white p-6 sm:p-8 space-y-6 shadow-[0_0_70px_rgba(0,112,255,0.7)] animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-[#0070FF]/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-2 rounded-full bg-[#0070FF] shadow-[0_0_15px_#0070FF]" />
                <h3 className="text-xl font-black italic text-[#FFFFFF] font-heading drop-shadow-[0_0_10px_rgba(0,112,255,0.6)]">
                  {modalType === 'score' ? 'TOP 10 SCORE' : 'TOP 10 ASSIST'}
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="rounded-xl border border-[#0070FF] bg-[#0070FF]/20 px-5 py-2 text-xs font-black text-[#60A5FA] transition-all duration-200 hover:bg-[#0070FF] hover:text-[#FFFFFF] hover:shadow-[0_0_20px_rgba(0,112,255,0.8)] cursor-pointer"
              >
                KEMBALI
              </button>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[65vh] overflow-y-auto p-3 sm:p-4 -mx-2 -my-2 custom-scrollbar">
              {(modalType === 'score' ? scorersList : assistsList).slice(0, 10).map((player) => (
                <div
                  key={player.rank}
                  onClick={() => setSelectedPlayer(player)}
                  className="flex items-center justify-between rounded-2xl border border-[#0070FF]/30 bg-[#0C1938] py-2 px-2.5 sm:px-3 transition-all duration-300 hover:border-[#38BDF8] hover:bg-[#13285A] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-xs font-score font-black text-[#60A5FA] group-hover:text-[#38BDF8] w-5 text-center shrink-0">
                      {player.rank}
                    </span>
                    <PlayerInitialsAvatar name={player.name} size="md" />
                    <div className="truncate">
                      <div className="text-xs font-black text-[#FFFFFF] group-hover:text-[#38BDF8] transition-colors truncate">{player.name}</div>
                      <div className="text-[10px] text-[#93C5FD] flex items-center gap-1.5 mt-0.5 font-bold flex-wrap">
                        <FlagIcon flag={player.flag} country={player.country} className="h-3.5 w-5.5 object-fill rounded shadow-sm border border-slate-400 shrink-0" />
                        <span className="truncate">{player.country}</span>
                        {player.note && <span className="text-[9px] text-[#38BDF8] font-semibold bg-[#0070FF]/20 px-1.5 py-0.5 rounded border border-[#38BDF8]/30">({player.note})</span>}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-xl border border-[#0070FF]/50 bg-[#0070FF] px-2.5 py-1 text-xs font-score font-black text-[#FFFFFF] shadow-[0_0_10px_rgba(0,112,255,0.5)] group-hover:bg-[#38BDF8] group-hover:text-[#030712] transition-all shrink-0 ml-2">
                    {modalType === 'score' ? `${player.goals} Gol` : `${player.assists} Assist`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Player Detail Card Popup (Poin 6: Glow biru lebar, setiap komponen glowing saat ditouch seperti gambar 5) */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#0070FF] bg-[#0A1329] text-white p-6 text-center shadow-[0_0_80px_rgba(0,112,255,0.85)] space-y-5 animate-in fade-in zoom-in duration-300">
            {/* Close Cross */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute right-4 top-4 rounded-full bg-[#0070FF]/20 border border-[#0070FF] p-1.5 text-[#60A5FA] transition-all duration-200 hover:bg-[#0070FF] hover:text-[#FFFFFF] hover:shadow-[0_0_20px_rgba(0,112,255,0.8)] hover:scale-110 cursor-pointer"
            >
              <X className="h-4 w-4 stroke-[3]" />
            </button>

            {/* Avatar Circle with Neon Glow */}
            <div className="relative mx-auto h-24 w-24">
              <PlayerInitialsAvatar name={selectedPlayer.name} size="lg" />
            </div>

            {/* Country & Name */}
            <div>
              <div className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider flex items-center justify-center gap-1.5">
                <FlagIcon flag={selectedPlayer.flag} country={selectedPlayer.country} className="h-4 w-6 object-cover rounded shadow border border-slate-400" />
                <span>{selectedPlayer.country}</span>
              </div>
              <h3 className="text-xl font-black text-[#FFFFFF] mt-0.5 drop-shadow-[0_0_10px_rgba(0,112,255,0.6)]">
                {selectedPlayer.name}
              </h3>
              {selectedPlayer.note && (
                <div className="mt-1.5 inline-block rounded-full border border-[#38BDF8]/40 bg-[#0070FF]/20 px-3 py-1 text-xs font-semibold text-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                  {selectedPlayer.note}
                </div>
              )}
            </div>

            {/* 3 Stat Cards (Setiap komponen glow saat ditouch/hover sesuai Poin 6) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl border-2 border-[#0070FF]/40 bg-[#0C1938] p-3 text-white transition-all duration-300 hover:border-[#38BDF8] hover:bg-[#13285A] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.85)] cursor-pointer group">
                <span className="text-lg">⚽</span>
                <div className="text-[10px] font-extrabold text-[#60A5FA] group-hover:text-[#38BDF8] transition-colors">Gol</div>
                <div className="text-lg font-score font-black text-[#FFFFFF] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                  {selectedPlayer.goals}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-[#0070FF]/40 bg-[#0C1938] p-3 text-white transition-all duration-300 hover:border-[#38BDF8] hover:bg-[#13285A] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.85)] cursor-pointer group">
                <span className="text-lg">👟</span>
                <div className="text-[10px] font-extrabold text-[#60A5FA] group-hover:text-[#38BDF8] transition-colors">Assist</div>
                <div className="text-lg font-score font-black text-[#FFFFFF] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                  {selectedPlayer.assists ?? 0}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-[#0070FF] bg-[#10244E] p-3 text-white shadow-[0_0_15px_rgba(0,112,255,0.4)] transition-all duration-300 hover:border-[#38BDF8] hover:bg-[#16326B] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.9)] cursor-pointer group">
                <span className="text-lg">🎯</span>
                <div className="text-[10px] font-extrabold text-[#38BDF8] transition-colors">Kontribusi</div>
                <div className="text-sm font-score font-black text-[#FFFFFF] mt-1 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                  {selectedPlayer.totalGA ?? selectedPlayer.goals + (selectedPlayer.assists || 0)} G/A
                </div>
              </div>
            </div>

            {/* Back Button with Neon Glow */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="w-full rounded-2xl border-2 border-[#0070FF] bg-gradient-to-r from-[#0052CC] to-[#0070FF] py-3 text-xs font-black text-[#FFFFFF] shadow-[0_0_25px_rgba(0,112,255,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0070FF] hover:to-[#38BDF8] hover:border-[#38BDF8] hover:shadow-[0_0_35px_rgba(56,189,248,0.9)] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              KEMBALI
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
