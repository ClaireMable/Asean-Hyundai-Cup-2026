import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { AFF_GROUPS } from '../data/affData';
import { FlagIcon } from './FlagIcon';
import { GroupTeam } from '../types';

const flagMap: Record<string, string> = {
  'Singapore': '🇸🇬',
  'Vietnam': '🇻🇳',
  'Indonesia': '🇲🇨',
  'Cambodia': '🇰🇭',
  'Timor-Leste': '🇹🇱',
  'Timor Leste': '🇹🇱',
  'Thailand': '🇹🇭',
  'Myanmar': '🇲🇲',
  'Malaysia': '🇲🇾',
  'Philippines': '🇵🇭',
  'Laos': '🇱🇦',
  'Brunei': '🇧🇳'
};

const parseESPNStandings = (data: any): Record<string, GroupTeam[]> | null => {
  if (!data || !data.children) return null;
  const parsedGroups: Record<string, GroupTeam[]> = {};

  data.children.forEach((child: any) => {
    const groupName = child.name?.replace('Group ', '') || ''; // 'A' or 'B'
    if (!groupName) return;

    const entries = child.standings?.entries || [];
    const teams: GroupTeam[] = entries.map((entry: any) => {
      const teamName = entry.team?.displayName || entry.team?.name || '';
      const findStat = (name: string) => entry.stats?.find((s: any) => s.name === name)?.value ?? 0;

      const p = findStat('gamesPlayed');
      const w = findStat('wins');
      const d = findStat('ties');
      const l = findStat('losses');
      const gf = findStat('pointsFor');
      const ga = findStat('pointsAgainst');
      const gd = findStat('pointDifferential');
      const pts = findStat('points');
      const rank = findStat('rank') || 1;

      // Construct a visual form representation based on wins/ties/losses
      const form: ('W' | 'D' | 'L')[] = [];
      for (let i = 0; i < w; i++) form.push('W');
      for (let i = 0; i < d; i++) form.push('D');
      for (let i = 0; i < l; i++) form.push('L');

      return {
        rank,
        country: teamName,
        flag: flagMap[teamName] || '🏆',
        p,
        w,
        d,
        l,
        gf,
        ga,
        gd,
        pts,
        form
      };
    });

    teams.sort((a, b) => a.rank - b.rank);
    parsedGroups[groupName] = teams;
  });

  return Object.keys(parsedGroups).length > 0 ? parsedGroups : null;
};

export const GroupStandingsSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('A');
  const [liveGroups, setLiveGroups] = useState<Record<string, GroupTeam[]> | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setIsUpdating(true);
        const res = await fetch('/api/espn/standings');
        if (res.ok) {
          const data = await res.json();
          const parsed = parseESPNStandings(data);
          if (parsed) {
            setLiveGroups(parsed);
          }
        }
      } catch (err) {
        console.error("Error fetching standings:", err);
      } finally {
        setIsUpdating(false);
      }
    };

    fetchStandings();
    const interval = setInterval(fetchStandings, 30000);
    return () => clearInterval(interval);
  }, []);

  const groupsList = ['A', 'B'];
  const activeGroupsSource = liveGroups || AFF_GROUPS;
  const currentGroupData = activeGroupsSource[selectedGroup] || AFF_GROUPS[selectedGroup] || AFF_GROUPS['A'];

  return (
    <section id="grup" className="bg-transparent py-10 border-t border-[#0256C4]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Card Container */}
        <div className="rounded-3xl border-2 border-[#0256C4]/30 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_10px_35px_rgba(2,86,196,0.12)]">
          
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-7 w-2 rounded-full bg-[#0256C4] shadow-[0_0_10px_#0256C4]" />
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-[#0F172A] font-heading">
                GRUP & KLASEMEN PIALA AFF 2026
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-[#0256C4] px-4 py-2 text-xs font-black text-[#FFFFFF] shadow-md">
              <Trophy className="h-4 w-4 text-[#FFFFFF]" />
              <span>PIALA AFF 2026</span>
            </div>
          </div>

          {/* World Cup Groups Selector & Table */}
          <div className="space-y-6">
            {/* Group Tabs A & B */}
            <div className="w-full">
              <div className="flex items-center gap-2 bg-[#EEF5FC] p-1.5 sm:p-2 rounded-2xl border border-[#0256C4]/30 w-full shadow-inner">
                {groupsList.map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedGroup(grp)}
                    className={`flex-1 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center tracking-wider ${
                      selectedGroup === grp
                        ? 'bg-[#0256C4] text-[#FFFFFF] shadow-md scale-[1.01]'
                        : 'text-[#0256C4] hover:bg-[#DBEAFE] hover:text-[#002B80]'
                    }`}
                  >
                    GRUP {grp}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border-2 border-[#0256C4]/20 bg-[#FFFFFF] p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#0F172A]">GRUP {selectedGroup}</span>
                  <span className="rounded bg-[#EEF5FC] px-2 py-0.5 text-[9px] font-extrabold text-[#0256C4] border border-[#0256C4]/30">
                    AFF STANDINGS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="tracking-wider ml-0.5">LIVE UPDATE</span>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black text-[#475569] uppercase bg-[#F8FAFC]">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">TIM</th>
                    <th className="py-2.5 px-3 text-center">MP</th>
                    <th className="py-2.5 px-3 text-center">W</th>
                    <th className="py-2.5 px-3 text-center">D</th>
                    <th className="py-2.5 px-3 text-center">L</th>
                    <th className="py-2.5 px-3 text-center">GF</th>
                    <th className="py-2.5 px-3 text-center">GA</th>
                    <th className="py-2.5 px-3 text-center">GD</th>
                    <th className="py-2.5 px-3 text-center font-bold text-[#0256C4]">PTS</th>
                    <th className="py-2.5 px-3 text-center">FORM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-extrabold text-[#0F172A]">
                  {currentGroupData.map((team) => (
                    <tr
                      key={team.rank}
                      className={`transition-colors ${
                        team.rank <= 2
                          ? 'bg-[#EEF5FC]/90 hover:bg-[#DBEAFE]'
                          : 'bg-[#FFFFFF] hover:bg-rose-50/50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${team.rank <= 2 ? 'bg-[#0256C4]' : 'bg-rose-500'}`} />
                          <span className={`font-black ${team.rank <= 2 ? 'text-[#0256C4]' : 'text-rose-600'}`}>{team.rank}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <FlagIcon flag={team.flag} country={team.country} className="h-4 w-6 object-cover rounded shadow-sm border border-slate-300" />
                          <span className={team.rank <= 2 ? 'text-[#0256C4] font-black' : 'text-[#0F172A]'}>
                            {team.country}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-[#475569]">{team.p}</td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-700">{team.w}</td>
                      <td className="py-3 px-3 text-center font-mono text-amber-700">{team.d}</td>
                      <td className="py-3 px-3 text-center font-mono text-rose-700">{team.l}</td>
                      <td className="py-3 px-3 text-center font-mono text-[#475569]">{team.gf}</td>
                      <td className="py-3 px-3 text-center font-mono text-[#475569]">{team.ga}</td>
                      <td className="py-3 px-3 text-center font-mono text-[#475569]">
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-sm font-black text-[#0256C4]">
                        {team.pts}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {team.form.map((f, idx) => (
                            <span
                              key={idx}
                              className={`h-2.5 w-2.5 rounded-full ${
                                f === 'W'
                                  ? 'bg-emerald-500'
                                  : f === 'D'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Legend Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 mt-4 text-[10px] text-[#475569] font-bold">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0256C4]" />
                    Lolos Babak Semifinal (Peringkat 1 & 2)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    Tersingkir
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span>LAST MATCH:</span>
                  <span className="text-emerald-700">🟢 Menang</span>
                  <span className="text-amber-700">🟠 Seri</span>
                  <span className="text-rose-600">🔴 Kalah</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
