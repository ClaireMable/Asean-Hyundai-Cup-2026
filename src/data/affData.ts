import { MatchItem, GroupTeam, ClubStanding, PlayerStat } from '../types';

export const MATCHES_DATA: MatchItem[] = [
  // FASE GRUP - Matchday 1
  { id: 'aff-m1-1', league: 'FASE GRUP - Matchday 1', date: '24 Juli 2026', time: '19:00 WIB', teamHome: 'Cambodia', flagHome: '🇰🇭', teamAway: 'Singapore', flagAway: '🇸🇬', handicap: '0 : 1/4', predictedHomeScore: 1, predictedAwayScore: 2, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m1-2', league: 'FASE GRUP - Matchday 1', date: '24 Juli 2026', time: '20:30 WIB', teamHome: 'Timor-Leste', flagHome: '🇹🇱', teamAway: 'Vietnam', flagAway: '🇻🇳', handicap: '1 1/2 : 0', predictedHomeScore: 0, predictedAwayScore: 3, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m1-3', league: 'FASE GRUP - Matchday 1', date: '25 Juli 2026', time: '17:00 WIB', teamHome: 'Myanmar', flagHome: '🇲🇲', teamAway: 'Malaysia', flagAway: '🇲🇾', handicap: '1/4 : 0', predictedHomeScore: 1, predictedAwayScore: 2, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m1-4', league: 'FASE GRUP - Matchday 1', date: '25 Juli 2026', time: '20:00 WIB', teamHome: 'Laos', flagHome: '🇱🇦', teamAway: 'Thailand', flagAway: '🇹🇭', handicap: '1 3/4 : 0', predictedHomeScore: 0, predictedAwayScore: 4, predictionOutcome: 'AWAY WIN' },

  // FASE GRUP - Matchday 2
  { id: 'aff-m2-1', league: 'FASE GRUP - Matchday 2', date: '27 Juli 2026', time: '18:00 WIB', teamHome: 'Singapore', flagHome: '🇸🇬', teamAway: 'Timor-Leste', flagAway: '🇹🇱', handicap: '0 : 1 1/4', predictedHomeScore: 2, predictedAwayScore: 0, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m2-2', league: 'FASE GRUP - Matchday 2', date: '27 Juli 2026', time: '20:30 WIB', teamHome: 'Indonesia', flagHome: '🇲🇨', teamAway: 'Cambodia', flagAway: '🇰🇭', handicap: '0 : 2', predictedHomeScore: 5, predictedAwayScore: 1, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m2-3', league: 'FASE GRUP - Matchday 2', date: '28 Juli 2026', time: '17:00 WIB', teamHome: 'Philippines', flagHome: '🇵🇭', teamAway: 'Myanmar', flagAway: '🇲🇲', handicap: '0 : 1/2', predictedHomeScore: 1, predictedAwayScore: 4, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m2-4', league: 'FASE GRUP - Matchday 2', date: '28 Juli 2026', time: '20:00 WIB', teamHome: 'Malaysia', flagHome: '🇲🇾', teamAway: 'Laos', flagAway: '🇱🇦', handicap: '0 : 1 1/2', predictedHomeScore: 4, predictedAwayScore: 0, predictionOutcome: 'HOME WIN' },

  // FASE GRUP - Matchday 3
  { id: 'aff-m3-1', league: 'FASE GRUP - Matchday 3', date: '31 Juli 2026', time: '17:00 WIB', teamHome: 'Timor-Leste', flagHome: '🇹🇱', teamAway: 'Indonesia', flagAway: '🇲🇨', handicap: '2 1/4 : 0', predictedHomeScore: 0, predictedAwayScore: 3, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m3-2', league: 'FASE GRUP - Matchday 3', date: '31 Juli 2026', time: '20:00 WIB', teamHome: 'Vietnam', flagHome: '🇻🇳', teamAway: 'Singapore', flagAway: '🇸🇬', handicap: '0 : 1', predictedHomeScore: 0, predictedAwayScore: 0, predictionOutcome: 'DRAW' },
  { id: 'aff-m3-3', league: 'FASE GRUP - Matchday 3', date: '1 Agustus 2026', time: '17:00 WIB', teamHome: 'Laos', flagHome: '🇱🇦', teamAway: 'Philippines', flagAway: '🇵🇭', handicap: '1 : 0', predictedHomeScore: 1, predictedAwayScore: 3, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m3-4', league: 'FASE GRUP - Matchday 3', date: '1 Agustus 2026', time: '20:00 WIB', teamHome: 'Thailand', flagHome: '🇹🇭', teamAway: 'Malaysia', flagAway: '🇲🇾', handicap: '0 : 3/4', predictedHomeScore: 2, predictedAwayScore: 1, predictionOutcome: 'HOME WIN' },

  // FASE GRUP - Matchday 4
  { id: 'aff-m4-1', league: 'FASE GRUP - Matchday 4', date: '3 Agustus 2026', time: '17:30 WIB', teamHome: 'Cambodia', flagHome: '🇰🇭', teamAway: 'Timor-Leste', flagAway: '🇹🇱', handicap: '0 : 3/4', predictedHomeScore: 2, predictedAwayScore: 1, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m4-2', league: 'FASE GRUP - Matchday 4', date: '3 Agustus 2026', time: '20:30 WIB', teamHome: 'Indonesia', flagHome: '🇲🇨', teamAway: 'Vietnam', flagAway: '🇻🇳', handicap: '0 : 1/4', predictedHomeScore: 2, predictedAwayScore: 1, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m4-3', league: 'FASE GRUP - Matchday 4', date: '4 Agustus 2026', time: '17:00 WIB', teamHome: 'Myanmar', flagHome: '🇲🇲', teamAway: 'Laos', flagAway: '🇱🇦', handicap: '0 : 1', predictedHomeScore: 2, predictedAwayScore: 0, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m4-4', league: 'FASE GRUP - Matchday 4', date: '4 Agustus 2026', time: '20:00 WIB', teamHome: 'Philippines', flagHome: '🇵🇭', teamAway: 'Thailand', flagAway: '🇹🇭', handicap: '1/2 : 0', predictedHomeScore: 1, predictedAwayScore: 2, predictionOutcome: 'AWAY WIN' },

  // FASE GRUP - Matchday 5
  { id: 'aff-m5-1', league: 'FASE GRUP - Matchday 5', date: '7 Agustus 2026', time: '20:00 WIB', teamHome: 'Vietnam', flagHome: '🇻🇳', teamAway: 'Cambodia', flagAway: '🇰🇭', handicap: '0 : 2', predictedHomeScore: 4, predictedAwayScore: 0, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m5-2', league: 'FASE GRUP - Matchday 5', date: '7 Agustus 2026', time: '20:00 WIB', teamHome: 'Singapore', flagHome: '🇸🇬', teamAway: 'Indonesia', flagAway: '🇲🇨', handicap: '1 1/4 : 0', predictedHomeScore: 1, predictedAwayScore: 3, predictionOutcome: 'AWAY WIN' },
  { id: 'aff-m5-3', league: 'FASE GRUP - Matchday 5', date: '8 Agustus 2026', time: '20:00 WIB', teamHome: 'Thailand', flagHome: '🇹🇭', teamAway: 'Myanmar', flagAway: '🇲🇲', handicap: '0 : 1 1/2', predictedHomeScore: 3, predictedAwayScore: 0, predictionOutcome: 'HOME WIN' },
  { id: 'aff-m5-4', league: 'FASE GRUP - Matchday 5', date: '8 Agustus 2026', time: '20:00 WIB', teamHome: 'Malaysia', flagHome: '🇲🇾', teamAway: 'Philippines', flagAway: '🇵🇭', handicap: '0 : 1/2', predictedHomeScore: 2, predictedAwayScore: 1, predictionOutcome: 'HOME WIN' },

  // BABAK GUGUR (SEMIFINAL & FINAL) - Semifinal Leg 1
  { id: 'aff-sf1-1', league: 'BABAK GUGUR - Semifinal Leg 1', date: '15 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Runner-up Group A', flagHome: '🏆', teamAway: 'Juara Group B', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },
  { id: 'aff-sf1-2', league: 'BABAK GUGUR - Semifinal Leg 1', date: '16 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Runner-up Group B', flagHome: '🏆', teamAway: 'Juara Group A', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },

  // BABAK GUGUR - Semifinal Leg 2
  { id: 'aff-sf2-1', league: 'BABAK GUGUR - Semifinal Leg 2', date: '18 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Juara Group B', flagHome: '🏆', teamAway: 'Runner-up Group A', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },
  { id: 'aff-sf2-2', league: 'BABAK GUGUR - Semifinal Leg 2', date: '19 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Juara Group A', flagHome: '🏆', teamAway: 'Runner-up Group B', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },

  // BABAK GUGUR - Grand Final
  { id: 'aff-gf-1', league: 'BABAK GUGUR - Grand Final Leg 1', date: '22 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Final Leg 1 (Pemenang SF 1)', flagHome: '🏆', teamAway: 'Final Leg 1 (Pemenang SF 2)', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },
  { id: 'aff-gf-2', league: 'BABAK GUGUR - Grand Final Leg 2', date: '26 Agustus 2026', time: 'Jam Belum Rilis', teamHome: 'Final Leg 2 (Pemenang SF 2)', flagHome: '🏆', teamAway: 'Final Leg 2 (Pemenang SF 1)', flagAway: '🏆', handicap: '?', predictedHomeScore: '?', predictedAwayScore: '?', predictionOutcome: '?' },
];

export const AFF_GROUPS: Record<string, GroupTeam[]> = {
  A: [
    { rank: 1, country: 'Singapore', flag: '🇸🇬', p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, form: ['W', 'W', 'D'] },
    { rank: 2, country: 'Indonesia', flag: '🇲🇨', p: 2, w: 2, d: 0, l: 0, gf: 8, ga: 1, gd: 7, pts: 6, form: ['W', 'W'] },
    { rank: 3, country: 'Vietnam', flag: '🇻🇳', p: 2, w: 1, d: 1, l: 0, gf: 7, ga: 0, gd: 7, pts: 4, form: ['W', 'D'] },
    { rank: 4, country: 'Cambodia', flag: '🇰🇭', p: 2, w: 0, d: 0, l: 2, gf: 2, ga: 7, gd: -5, pts: 0, form: ['L', 'L'] },
    { rank: 5, country: 'Timor-Leste', flag: '🇹🇱', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 12, gd: -12, pts: 0, form: ['L', 'L', 'L'] },
  ],
  B: [
    { rank: 1, country: 'Malaysia', flag: '🇲🇾', p: 2, w: 2, d: 0, l: 0, gf: 6, ga: 1, gd: 5, pts: 6, form: ['W', 'W'] },
    { rank: 2, country: 'Thailand', flag: '🇹🇭', p: 1, w: 1, d: 0, l: 0, gf: 5, ga: 0, gd: 5, pts: 3, form: ['W'] },
    { rank: 3, country: 'Myanmar', flag: '🇲🇲', p: 2, w: 1, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 3, form: ['L', 'W'] },
    { rank: 4, country: 'Philippines', flag: '🇵🇭', p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 4, gd: -3, pts: 0, form: ['L'] },
    { rank: 5, country: 'Laos', flag: '🇱🇦', p: 2, w: 0, d: 0, l: 2, gf: 0, ga: 9, gd: -9, pts: 0, form: ['L', 'L'] },
  ],
};

export const TOP_SCORERS: PlayerStat[] = [
  { rank: 1, name: 'Ramadhan Sananta', country: 'Indonesia', flag: '🇲🇨', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', goals: 3, assists: 0, totalGA: 3, note: 'Hattrick vs Cambodia' },
  { rank: 2, name: 'Nguyễn Đình Bắc', country: 'Vietnam', flag: '🇻🇳', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', goals: 3, assists: 1, totalGA: 4, note: 'Hattrick vs Timor-Leste' },
  { rank: 3, name: 'Paulo Josué', country: 'Malaysia', flag: '🇲🇾', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', goals: 3, assists: 0, totalGA: 3, note: '3 Gol dari 2 Pertandingan' },
  { rank: 4, name: 'Kakana Khamyok', country: 'Thailand', flag: '🇹🇭', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', goals: 2, assists: 1, totalGA: 3 },
  { rank: 5, name: 'Đỗ Hoàng Hên', country: 'Vietnam', flag: '🇻🇳', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', goals: 2, assists: 0, totalGA: 2 },
  { rank: 6, name: 'Than Paing', country: 'Myanmar', flag: '🇲🇲', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', goals: 2, assists: 1, totalGA: 3, note: 'Brace vs Philippines' },
  { rank: 7, name: 'Ilhan Fandi', country: 'Singapore', flag: '🇸🇬', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', goals: 2, assists: 0, totalGA: 2, note: 'Total 2 Gol turnamen' },
  { rank: 8, name: 'Sandy Walsh', country: 'Indonesia', flag: '🇲🇨', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', goals: 1, assists: 0, totalGA: 1 },
  { rank: 9, name: 'Jens Raven', country: 'Indonesia', flag: '🇲🇨', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', goals: 1, assists: 0, totalGA: 1 },
  { rank: 10, name: 'Teerasak Poeiphimai', country: 'Thailand', flag: '🇹🇭', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', goals: 1, assists: 0, totalGA: 1 },
];

export const TOP_ASSISTS: PlayerStat[] = [
  { rank: 1, name: 'Thom Haye', country: 'Indonesia', flag: '🇲🇨', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 3, totalGA: 3 },
  { rank: 2, name: 'Nguyễn Đình Bắc', country: 'Vietnam', flag: '🇻🇳', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', goals: 3, assists: 1, totalGA: 4, note: 'Hattrick vs Timor-Leste' },
  { rank: 3, name: 'Nguyễn Hoàng Đức', country: 'Vietnam', flag: '🇻🇳', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 4, name: 'Văn Vĩ', country: 'Vietnam', flag: '🇻🇳', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 5, name: 'Sarach Yooyen', country: 'Thailand', flag: '🇹🇭', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 6, name: 'Kakana Khamyok', country: 'Thailand', flag: '🇹🇭', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', goals: 2, assists: 1, totalGA: 3 },
  { rank: 7, name: 'Muhammad Naaim', country: 'Malaysia', flag: '🇲🇾', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 8, name: 'Farhan Zulkifli', country: 'Singapore', flag: '🇸🇬', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 9, name: 'Kyaw Min Oo', country: 'Myanmar', flag: '🇲🇲', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
  { rank: 10, name: 'Ekanit Panya', country: 'Thailand', flag: '🇹🇭', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', goals: 0, assists: 1, totalGA: 1 },
];

export const BRACKET_DATA = {
  roundOf32: [
    { id: 1, date: '28 Juni 2026', team1: 'Indonesia', score1: 3, team2: 'Myanmar', score2: 0, winner: 1, flag1: '🇲🇨', flag2: '🇲🇲' },
    { id: 2, date: '28 Juni 2026', team1: 'Vietnam', score1: 2, team2: 'Singapore', score2: 1, winner: 1, flag1: '🇻🇳', flag2: '🇸🇬' },
    { id: 3, date: '29 Juni 2026', team1: 'Thailand', score1: 4, team2: 'Laos', score2: 0, winner: 1, flag1: '🇹🇭', flag2: '🇱🇦' },
    { id: 4, date: '29 Juni 2026', team1: 'Malaysia', score1: 2, team2: 'Philippines', score2: 1, winner: 1, flag1: '🇲🇾', flag2: '🇵🇭' },
    { id: 5, date: '30 Juni 2026', team1: 'Cambodia', score1: 1, team2: 'Timor-Leste', score2: 0, winner: 1, flag1: '🇰🇭', flag2: '🇹🇱' },
    { id: 6, date: '30 Juni 2026', team1: 'Brunei', score1: 0, team2: 'Singapore B', score2: 2, winner: 2, flag1: '🇧🇳', flag2: '🇸🇬' },
  ],
  roundOf16: [
    { id: 1, date: '4 Juli 2026', team1: 'Indonesia', score1: 2, team2: 'Malaysia', score2: 0, winner: 1, flag1: '🇲🇨', flag2: '🇲🇾' },
    { id: 2, date: '4 Juli 2026', team1: 'Thailand', score1: 2, team2: 'Vietnam', score2: 1, winner: 1, flag1: '🇹🇭', flag2: '🇻🇳' },
    { id: 3, date: '5 Juli 2026', team1: 'Singapore', score1: 3, team2: 'Cambodia', score2: 1, winner: 1, flag1: '🇸🇬', flag2: '🇰🇭' },
    { id: 4, date: '5 Juli 2026', team1: 'Philippines', score1: 1, team2: 'Myanmar', score2: 0, winner: 1, flag1: '🇵🇭', flag2: '🇲🇲' },
  ],
  quarterFinals: [
    { id: 1, date: '10 Juli 2026', team1: 'Indonesia', score1: 3, team2: 'Philippines', score2: 1, winner: 1, flag1: '🇲🇨', flag2: '🇵🇭' },
    { id: 2, date: '10 Juli 2026', team1: 'Thailand', score1: 2, team2: 'Malaysia', score2: 0, winner: 1, flag1: '🇹🇭', flag2: '🇲🇾' },
    { id: 3, date: '11 Juli 2026', team1: 'Singapore', score1: 2, team2: 'Cambodia', score2: 0, winner: 1, flag1: '🇸🇬', flag2: '🇰🇭' },
    { id: 4, date: '11 Juli 2026', team1: 'Vietnam', score1: 2, team2: 'Laos', score2: 1, winner: 1, flag1: '🇻🇳', flag2: '🇱🇦' },
  ],
  semiFinals: [
    { id: 1, date: '15 Agustus 2026', team1: 'Juara Group A', score1: '?', team2: 'Runner-up Group B', score2: '?', winner: 0, flag1: '🏆', flag2: '🏆' },
    { id: 2, date: '16 Agustus 2026', team1: 'Juara Group B', score1: '?', team2: 'Runner-up Group A', score2: '?', winner: 0, flag1: '🏆', flag2: '🏆' },
  ],
  final: {
    id: 1,
    date: '22 Agustus 2026',
    team1: 'Pemenang Semifinal 1',
    score1: '?',
    team2: 'Pemenang Semifinal 2',
    score2: '?',
    winner: 0,
    flag1: '🏆',
    flag2: '🏆',
  },
  champion: {
    name: 'BELUM DITENTUKAN',
    flag: '🏆',
    subtitle: 'TROFI PIALA AFF 2026',
    date: 'AGUSTUS 2026',
  },
};

