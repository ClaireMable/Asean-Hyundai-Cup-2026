import React, { useState } from 'react';
import { Trophy, CheckCircle2, Flame, Star } from 'lucide-react';
import { BRACKET_DATA } from '../data/affData';
import { FlagIcon } from './FlagIcon';

type StageKey = 'semiFinals' | 'final' | 'champion';

interface StageConfig {
  key: StageKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  description: string;
}

const STAGES: StageConfig[] = [
  {
    key: 'semiFinals',
    label: 'SEMI-FINALS',
    sublabel: '4 NEGARA',
    icon: <Flame className="h-4 w-4" />,
    description: 'Babak semifinal mempertemukan 4 kekuatan utama Asia Tenggara untuk memperebutkan 2 tiket paling berharga menuju partai puncak.',
  },
  {
    key: 'final',
    label: 'FINAL',
    sublabel: 'PARTAI PUNCAK',
    icon: <Star className="h-4 w-4" />,
    description: 'Partai puncak Piala AFF 2026. Laga pamungkas penuh gengsi menentukan raksasa sepak bola Asia Tenggara sesungguhnya.',
  },
  {
    key: 'champion',
    label: 'JUARA AFF',
    sublabel: 'SANG MAHKOTA',
    icon: <Trophy className="h-4 w-4" />,
    description: 'Sang Mahkota Juara Piala AFF 2026. Babak penentuan siapakah tim raksasa Asia Tenggara yang akan mengangkat trofi bergengsi musim ini.',
  },
];

export const TournamentBracketSection: React.FC = () => {
  const [bracketView, setBracketView] = useState<'visual' | 'detail'>('visual');
  const [selectedStageKey, setSelectedStageKey] = useState<StageKey>('semiFinals');

  const selectedStage = STAGES.find((s) => s.key === selectedStageKey) || STAGES[0];

  const renderStageMatchups = () => {
    if (selectedStageKey === 'champion') {
      const isUndetermined = BRACKET_DATA.champion.name.includes('BELUM') || BRACKET_DATA.champion.flag === '🏆';
      return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-[#38BDF8] bg-gradient-to-b from-[#0256C4] via-[#014296] to-[#003070] text-center space-y-5 shadow-[0_0_30px_rgba(2,86,196,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300">
          <Trophy className={`h-16 w-16 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] ${isUndetermined ? 'animate-pulse' : 'animate-bounce'}`} />
          <div>
            <span className="text-xs font-black text-amber-300 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
              PEMENANG UTAMA PIALA AFF 2026
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] font-heading mt-1 drop-shadow-md">
              {BRACKET_DATA.champion.name}
            </h3>
          </div>
          <div className="flex justify-center">
            {isUndetermined ? (
              <div className="flex h-16 w-28 items-center justify-center rounded-xl bg-amber-500/15 border-2 border-dashed border-amber-400 text-3xl shadow-[inset_0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                🏆
              </div>
            ) : (
              <FlagIcon
                flag={BRACKET_DATA.champion.flag}
                country={BRACKET_DATA.champion.name}
                className="h-16 w-28 object-cover rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-amber-400"
              />
            )}
          </div>
          <p className="text-xs text-[#E0F2FE] max-w-md font-bold leading-relaxed">
            {isUndetermined
              ? 'Turnamen saat ini masih berlangsung di fase awal. Siapakah tim yang akan merengkuh trofi kebanggaan Piala AFF 2026?'
              : 'Selamat kepada pemenang atas kejuaraan bergengsi ini! Menang dalam perjuangan sengit sepanjang turnamen.'}
          </p>
        </div>
      );
    }

    let matchupsList: Array<{
      id?: number;
      date?: string;
      team1: string;
      score1: number | string;
      team2: string;
      score2: number | string;
      winner: number;
      flag1: string;
      flag2: string;
    }> = [];

    if (selectedStageKey === 'final') {
      matchupsList = [BRACKET_DATA.final];
    } else {
      matchupsList = BRACKET_DATA[selectedStageKey] || [];
    }

    return (
      <div className="space-y-4">
        <div className="text-xs font-black tracking-wider text-[#0256C4] uppercase flex items-center gap-2">
          <span>⚡ DAFTAR PERTANDINGAN ({matchupsList.length} MATCHUPS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[440px] overflow-y-auto pr-1 custom-scrollbar">
          {matchupsList.map((m, idx) => {
            const winnerTeamName = m.winner === 1 ? m.team1 : m.winner === 2 ? m.team2 : 'Belum Ditentukan';
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-[#38BDF8]/70 bg-[#0256C4] text-white p-4 space-y-3 shadow-[0_0_20px_rgba(2,86,196,0.35)] hover:border-[#38BDF8] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-[1.01] transition-all duration-300"
              >
                {/* Header Matchup Row */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="rounded-md bg-[#003882] px-2.5 py-1 font-black text-[#38BDF8] border border-[#38BDF8]/40 uppercase shadow-inner">
                    MATCHUP {m.id || idx + 1}
                  </span>
                  <span className="font-bold text-[#E0F2FE]">{m.date || 'Agustus 2026'}</span>
                </div>

                {/* Team 1 */}
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                    m.winner === 1
                      ? 'bg-[#0070FF] text-[#FFFFFF] border-2 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                      : 'bg-[#003882]/80 text-[#FFFFFF] border border-[#60A5FA]/30 hover:bg-[#003882]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon flag={m.flag1} country={m.team1} className="h-4.5 w-6.5 object-cover rounded shrink-0 border border-slate-400/50 shadow-sm" />
                    <span className="text-xs font-black tracking-wide">{m.team1}</span>
                  </div>
                  <span className="font-score font-black text-base text-[#38BDF8]">{m.score1}</span>
                </div>

                {/* Team 2 */}
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                    m.winner === 2
                      ? 'bg-[#0070FF] text-[#FFFFFF] border-2 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                      : 'bg-[#003882]/80 text-[#FFFFFF] border border-[#60A5FA]/30 hover:bg-[#003882]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon flag={m.flag2} country={m.team2} className="h-4.5 w-6.5 object-cover rounded shrink-0 border border-slate-400/50 shadow-sm" />
                    <span className="text-xs font-black tracking-wide">{m.team2}</span>
                  </div>
                  <span className="font-score font-black text-base text-[#38BDF8]">{m.score2}</span>
                </div>

                {/* Footer Winner Tag */}
                <div className="flex items-center justify-between pt-2 border-t border-[#38BDF8]/20 text-[10px]">
                  <span className="text-[#E0F2FE] font-bold">{m.winner === 0 ? 'Status Laga:' : 'Pemenang:'}</span>
                  <span className={`flex items-center gap-1 font-black uppercase tracking-wider ${m.winner === 0 ? 'text-amber-300' : 'text-[#38BDF8]'}`}>
                    {m.winner !== 0 ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-[#38BDF8]" />
                        {winnerTeamName}
                      </>
                    ) : (
                      <span>⏳ Menunggu Jadwal</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="bracket" className="bg-transparent py-10 border-t border-[#0256C4]/20">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* Main Outer Container */}
        <div className="rounded-3xl border-2 border-[#0256C4]/30 bg-[#FFFFFF] p-5 sm:p-8 space-y-6 shadow-[0_10px_35px_rgba(2,86,196,0.12)]">
          
          {/* Header & View Toggle Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="h-7 w-2 rounded-full bg-[#0256C4] shadow-[0_0_10px_#0256C4]" />
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-[#0F172A] font-heading">
                BAGAN & ROAD TO FINAL
              </h2>
            </div>

            {/* View Switching Pills (Visual vs Detail) */}
            <div className="flex rounded-xl bg-[#EEF5FC] p-1 border border-[#0256C4]/30 shadow-inner">
              <button
                onClick={() => setBracketView('visual')}
                className={`rounded-lg px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                  bracketView === 'visual'
                    ? 'bg-[#0256C4] text-[#FFFFFF] shadow-md'
                    : 'text-[#0256C4] hover:text-[#002B80]'
                }`}
              >
                BAGAN VISUAL
              </button>
              <button
                onClick={() => setBracketView('detail')}
                className={`rounded-lg px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                  bracketView === 'detail'
                    ? 'bg-[#0256C4] text-[#FFFFFF] shadow-md'
                    : 'text-[#0256C4] hover:text-[#002B80]'
                }`}
              >
                DETAIL PER BABAK
              </button>
            </div>
          </div>

          {/* VIEW 1: BAGAN VISUAL */}
          {bracketView === 'visual' && (
            <div className="space-y-4">
              <p className="text-center text-[10px] font-mono font-bold text-[#0256C4]">
                ← BAGAN TAHAP AKHIR: SEMI-FINALE • FINAL • JUARA PIALA AFF 2026 →
              </p>

              <div className="overflow-x-auto pb-4">
                <div className="min-w-[700px] max-w-5xl mx-auto grid grid-cols-3 gap-6 items-center">
                  
                  {/* Column 1: Semi-Finale */}
                  <div className="space-y-6">
                    <div className="text-center text-xs font-black text-[#0256C4] tracking-widest uppercase border-b-2 border-[#0256C4]/30 pb-2 font-heading">
                      SEMI-FINALE
                    </div>
                    {BRACKET_DATA.semiFinals.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border-2 border-[#38BDF8] bg-[#0256C4] p-4 text-xs font-black space-y-3 shadow-[0_0_25px_rgba(2,86,196,0.45)] hover:border-[#60A5FA] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="text-[10px] text-[#E0F2FE] font-mono text-center font-extrabold tracking-wider drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] uppercase">
                          LAGA SEMIFINAL #{idx + 1}
                        </div>
                        <div
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                            m.winner === 1
                              ? 'bg-[#0070FF] text-[#FFFFFF] shadow-[0_0_15px_rgba(56,189,248,0.6)] border-2 border-[#38BDF8]'
                              : 'bg-[#003882]/90 text-[#FFFFFF] border border-[#60A5FA]/40 hover:bg-[#002B66]'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <FlagIcon flag={m.flag1} country={m.team1} className="h-4.5 w-6.5 object-cover rounded border border-slate-400/50 shrink-0 shadow-sm" />
                            <span className="tracking-wide text-white">{m.team1}</span>
                          </span>
                          <span className="font-score font-black text-sm text-[#38BDF8]">{m.score1}</span>
                        </div>
                        <div
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                            m.winner === 2
                              ? 'bg-[#0070FF] text-[#FFFFFF] shadow-[0_0_15px_rgba(56,189,248,0.6)] border-2 border-[#38BDF8]'
                              : 'bg-[#003882]/90 text-[#FFFFFF] border border-[#60A5FA]/40 hover:bg-[#002B66]'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <FlagIcon flag={m.flag2} country={m.team2} className="h-4.5 w-6.5 object-cover rounded border border-slate-400/50 shrink-0 shadow-sm" />
                            <span className="tracking-wide text-white">{m.team2}</span>
                          </span>
                          <span className="font-score font-black text-sm text-[#38BDF8]">{m.score2}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column 2: Final */}
                  <div className="space-y-6">
                    <div className="text-center text-xs font-black text-[#0256C4] tracking-widest uppercase border-b-2 border-[#0256C4]/30 pb-2 font-heading">
                      FINAL
                    </div>
                    <div className="rounded-2xl border-2 border-[#38BDF8] bg-[#0256C4] p-4.5 text-xs font-black space-y-3.5 shadow-[0_0_30px_rgba(2,86,196,0.5)] hover:border-[#60A5FA] hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] hover:scale-[1.02] transition-all duration-300">
                      <div className="text-[10px] text-amber-300 font-mono text-center font-extrabold tracking-wider drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] uppercase">
                        PARTAI PUNCAK ({BRACKET_DATA.final.date || '22 AGUSTUS 2026'})
                      </div>
                      <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${BRACKET_DATA.final.winner === 1 ? 'bg-[#0070FF] text-[#FFFFFF] shadow-[0_0_15px_rgba(56,189,248,0.6)] border-2 border-[#38BDF8]' : 'bg-[#003882]/90 text-[#FFFFFF] border border-[#60A5FA]/40 hover:bg-[#002B66]'}`}>
                        <span className="flex items-center gap-2.5">
                          <FlagIcon flag={BRACKET_DATA.final.flag1} country={BRACKET_DATA.final.team1} className="h-5 w-7.5 object-cover rounded border border-slate-400/50 shrink-0 shadow-sm" />
                          <span className="text-sm tracking-wide text-white">{BRACKET_DATA.final.team1}</span>
                        </span>
                        <span className="font-score font-black text-base text-[#38BDF8]">
                          {BRACKET_DATA.final.score1}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${BRACKET_DATA.final.winner === 2 ? 'bg-[#0070FF] text-[#FFFFFF] shadow-[0_0_15px_rgba(56,189,248,0.6)] border-2 border-[#38BDF8]' : 'bg-[#003882]/90 text-[#FFFFFF] border border-[#60A5FA]/40 hover:bg-[#002B66]'}`}>
                        <span className="flex items-center gap-2.5">
                          <FlagIcon flag={BRACKET_DATA.final.flag2} country={BRACKET_DATA.final.team2} className="h-5 w-7.5 object-cover rounded border border-slate-400/50 shrink-0 shadow-sm" />
                          <span className="text-sm tracking-wide text-white">{BRACKET_DATA.final.team2}</span>
                        </span>
                        <span className="font-score font-black text-base text-[#38BDF8]">
                          {BRACKET_DATA.final.score2}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: World / AFF Champion */}
                  <div className="space-y-6 text-center">
                    <div className="text-center text-xs font-black text-amber-500 tracking-widest uppercase border-b-2 border-amber-500/40 pb-2 font-heading">
                      JUARA AFF 2026
                    </div>
                    <div className="rounded-2xl border-2 border-[#F59E0B] bg-gradient-to-b from-[#181104] via-[#0d0902] to-[#060401] p-5 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] hover:scale-[1.02] transition-all duration-300 space-y-3.5">
                      <Trophy className={`h-12 w-12 text-amber-400 mx-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] ${BRACKET_DATA.champion.name.includes('BELUM') ? 'animate-pulse' : 'animate-bounce'}`} />
                      <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                        {BRACKET_DATA.champion.subtitle}
                      </span>
                      <div className="flex justify-center">
                        {BRACKET_DATA.champion.name.includes('BELUM') || BRACKET_DATA.champion.flag === '🏆' ? (
                          <div className="flex h-14 w-28 items-center justify-center rounded-xl bg-amber-500/15 border-2 border-dashed border-amber-400 text-2xl shadow-[inset_0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                            🏆
                          </div>
                        ) : (
                          <FlagIcon flag={BRACKET_DATA.champion.flag} country={BRACKET_DATA.champion.name} className="h-14 w-24 object-cover rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.6)] border-2 border-amber-400" />
                        )}
                      </div>
                      <div className="text-base font-black text-[#FFFFFF] font-heading tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                        {BRACKET_DATA.champion.name}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: DETAIL PER BABAK */}
          {bracketView === 'detail' && (
            <div className="space-y-6">
              
              {/* Top Horizontal Stage Selection Cards (3 Stages Grid) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                {STAGES.map((stage) => {
                  const isActive = selectedStageKey === stage.key;
                  return (
                    <button
                      key={stage.key}
                      onClick={() => setSelectedStageKey(stage.key)}
                      className={`group relative flex flex-col items-center justify-between rounded-2xl p-3.5 border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-[#38BDF8] bg-[#0256C4] text-[#FFFFFF] shadow-[0_0_20px_rgba(2,86,196,0.45)] scale-[1.02]'
                          : 'border-[#0256C4]/40 bg-[#EEF5FC] text-[#0256C4] hover:bg-[#0256C4] hover:text-[#FFFFFF] hover:border-[#38BDF8] hover:shadow-[0_0_20px_rgba(2,86,196,0.35)]'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                          isActive
                            ? 'bg-[#FFFFFF]/20 text-[#FFFFFF] shadow-inner'
                            : 'bg-[#0256C4]/15 text-[#0256C4] group-hover:bg-[#FFFFFF]/20 group-hover:text-[#FFFFFF]'
                        }`}
                      >
                        {stage.icon}
                      </div>

                      <div className="text-center mt-2 space-y-0.5">
                        <div className="text-[11px] font-black tracking-wider uppercase font-heading">
                          {stage.label}
                        </div>
                        <div
                          className={`text-[9px] font-black uppercase tracking-widest ${
                            isActive ? 'text-[#E0F2FE]' : 'text-[#64748B] group-hover:text-[#E0F2FE]'
                          }`}
                        >
                          {stage.sublabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Content Container */}
              <div className="rounded-2xl border-2 border-[#0256C4]/30 bg-[#FFFFFF] p-4 sm:p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Stage Info & Status Legend */}
                <div className="lg:col-span-4 space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-5 lg:pb-0 lg:pr-6">
                  
                  <div className="inline-block rounded-md bg-[#EEF5FC] px-2.5 py-1 text-[10px] font-black text-[#0256C4] border border-[#0256C4]/30 uppercase tracking-wider">
                    DETAIL FASE PERTANDINGAN
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#0F172A] font-heading tracking-wide">
                      {selectedStage.label}
                    </h3>
                    <p className="text-xs text-[#475569] font-medium leading-relaxed">
                      {selectedStage.description}
                    </p>
                  </div>

                  {/* Keterangan Status Box */}
                  <div className="rounded-xl border-2 border-[#38BDF8]/60 bg-[#0256C4] text-white p-4 space-y-2.5 shadow-[0_0_20px_rgba(2,86,196,0.35)]">
                    <div className="text-[10px] font-black text-[#E0F2FE] uppercase tracking-widest font-heading">
                      KETERANGAN STATUS
                    </div>
                    <div className="space-y-1.5 text-[11px] font-bold">
                      <div className="flex items-center gap-2 text-[#FFFFFF]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                        <span>Lolos Babak Selanjutnya</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#E2E8F0]">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f87171]" />
                        <span>Tereliminasi</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Matchups List Grid */}
                <div className="lg:col-span-8">
                  {renderStageMatchups()}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
