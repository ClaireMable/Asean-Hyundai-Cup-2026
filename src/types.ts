export interface MatchItem {
  id: string;
  league: string;
  date: string;
  time: string;
  teamHome: string;
  teamAway: string;
  flagHome: string;
  flagAway: string;
  rankHome?: string;
  rankAway?: string;
  handicap: string;
  predictedHomeScore?: number | string;
  predictedAwayScore?: number | string;
  predictionOutcome?: 'HOME WIN' | 'AWAY WIN' | 'DRAW' | '?' | string;
}

export interface GroupTeam {
  rank: number;
  country: string;
  flag: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
}

export interface GroupData {
  groupName: string;
  teams: GroupTeam[];
}

export interface ClubStanding {
  rank: number;
  club: string;
  logo: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
  status?: 'champions' | 'europa' | 'conference' | 'relegation';
}

export interface BracketMatch {
  id: string;
  teamHome: string;
  flagHome: string;
  scoreHome: number;
  penaltyHome?: number;
  teamAway: string;
  flagAway: string;
  scoreAway: number;
  penaltyAway?: number;
  winner: 'home' | 'away';
}

export interface PlayerStat {
  rank: number;
  name: string;
  country: string;
  flag: string;
  avatar?: string;
  goals: number;
  assists?: number;
  totalGA?: number;
  note?: string;
}
