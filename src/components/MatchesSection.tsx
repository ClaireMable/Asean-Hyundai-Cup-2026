import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Sparkles, CheckCircle, Trophy, X } from 'lucide-react';
import { MATCHES_DATA } from '../data/affData';
import { MatchItem } from '../types';
import { FlagIcon } from './FlagIcon';

export const teamScorersMap: Record<string, string[]> = {
  'Vietnam': ['Nguyễn Đình Bắc', 'Đỗ Hoàng Hên', 'Nguyễn Xuân Son', 'Nguyễn Quang Hải', 'Văn Vĩ'],
  'Thailand': ['Kakana Khamyok', 'Teerasak Poeiphimai', 'Suphanat Mueanta', 'Sarach Yooyen', 'Supachai Chaided'],
  'Indonesia': ['Marselino Ferdinan', 'Rafael Struick', 'Thom Haye', 'Ragnar Oratmangoen', 'Jay Idzes'],
  'Malaysia': ['Paulo Josué', 'Arif Aiman', 'Faisal Halim', 'Muhammad Naaim', 'Safawi Rasid'],
  'Singapura': ['Muhammad Shawal', 'Ilhan Fandi', 'Ikhsan Fandi', 'Hariss Harun', 'Farhan Zulkifli'],
  'Singapore': ['Muhammad Shawal', 'Ilhan Fandi', 'Ikhsan Fandi', 'Hariss Harun', 'Farhan Zulkifli'],
  'Kamboja': ['Ouk Sovann', 'Sieng Chanthea', 'Lim Pisoth', 'Sa Ty'],
  'Cambodia': ['Ouk Sovann', 'Sieng Chanthea', 'Lim Pisoth', 'Sa Ty'],
  'Myanmar': ['Kyaw Min Oo', 'Maung Maung Lwin', 'Aung Thu', 'Than Paing'],
  'Laos': ['Bounphachan Bounkong', 'Chony Wenpaserth', 'Peter Phanthavong'],
  'Filipina': ['Patrick Reichelt', 'Bienvenido Marañón', 'Jefferson Tabinas'],
  'Philippines': ['Patrick Reichelt', 'Bienvenido Marañón', 'Jefferson Tabinas'],
  'Timor Leste': ['Mouzinho', 'Gali Freitas', 'João Pedro'],
  'Timor-Leste': ['Mouzinho', 'Gali Freitas', 'João Pedro']
};

const isMatchFinished = (match: MatchItem) => {
  return match.league.includes('Matchday 1') || match.id.startsWith('aff-m1-') || match.id.startsWith('aff-m2-');
};

const getMatchDetails = (match: MatchItem, liveInfo?: any) => {
  const isFinished = liveInfo ? (liveInfo.isLive ? false : (liveInfo.isFinished !== undefined ? liveInfo.isFinished : isMatchFinished(match))) : isMatchFinished(match);
  const isLive = liveInfo ? liveInfo.isLive : false;

  if (!isFinished && !isLive) {
    const hash = match.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const stadiums = [
      'Gelora Bung Karno Stadium, Jakarta',
      'Chonburi UTA Stadium, Chonburi',
      'Bukit Jalil National Stadium, KL',
      'My Dinh National Stadium, Hanoi',
      'National Stadium, Singapore'
    ];
    const stadium = stadiums[hash % stadiums.length];

    return {
      scoreHome: '-' as any,
      scoreAway: '-' as any,
      status: 'BELUM MULAI',
      stadium: match.league.includes('Semifinal') || match.league.includes('Final') || match.teamHome.includes('Juara') || match.teamAway.includes('Juara') || match.teamHome.includes('Group') || match.teamAway.includes('Group') ? 'Stadion Belum Rilis' : stadium,
      scorersHome: [] as string[],
      scorersAway: [] as string[],
      stats: {
        fouls: ['-', '-'] as any,
        yellowCards: ['-', '-'] as any,
        redCards: ['-', '-'] as any,
        offsides: ['-', '-'] as any,
        corners: ['-', '-'] as any,
        possession: ['-', '-'] as any,
        totalShots: ['-', '-'] as any,
        shotsOnTarget: ['-', '-'] as any,
      }
    };
  }

  if (match.id === 'aff-m2-3' || ((match.teamHome.includes('Filipina') && match.teamAway.includes('Myanmar')) || (match.teamHome.includes('Myanmar') && match.teamAway.includes('Filipina')))) {
    const isHomePh = match.teamHome.includes('Filipina');
    return {
      scoreHome: isHomePh ? 1 : 4,
      scoreAway: isHomePh ? 4 : 1,
      status: 'FULL TIME',
      stadium: 'Rizal Memorial Stadium, Manila',
      scorersHome: isHomePh ? ["Jarvey Gayoso 68'"] : ["Kyaw Min Oo 7'", "Than Paing 28', 83'", "Win Naing Tun 81'"],
      scorersAway: isHomePh ? ["Kyaw Min Oo 7'", "Than Paing 28', 83'", "Win Naing Tun 81'"] : ["Jarvey Gayoso 68'"],
      stats: {
        fouls: isHomePh ? [12, 14] : [14, 12],
        yellowCards: isHomePh ? [2, 3] : [3, 2],
        redCards: [0, 0] as [number, number],
        offsides: isHomePh ? [1, 3] : [3, 1],
        corners: isHomePh ? [5, 4] : [4, 5],
        possession: isHomePh ? ["62%", "38%"] : ["38%", "62%"],
        totalShots: isHomePh ? [9, 12] : [12, 9],
        shotsOnTarget: isHomePh ? [2, 7] : [7, 2],
      }
    };
  }

  if (match.id === 'aff-m2-1' || ((match.teamHome.includes('Singapura') && match.teamAway.includes('Timor')) || (match.teamHome.includes('Timor') && match.teamAway.includes('Singapura')))) {
    const isHomeSg = match.teamHome.includes('Singapura');
    return {
      scoreHome: isHomeSg ? 2 : 0,
      scoreAway: isHomeSg ? 0 : 2,
      status: 'FULL TIME',
      stadium: 'National Stadium, Singapore',
      scorersHome: isHomeSg ? ["Ilhan Fandi 41'", "Song Ui-young 56'"] : [],
      scorersAway: isHomeSg ? [] : ["Ilhan Fandi 41'", "Song Ui-young 56'"],
      stats: {
        fouls: isHomeSg ? [11, 10] : [10, 11],
        yellowCards: isHomeSg ? [3, 2] : [2, 3],
        redCards: [0, 0] as [number, number],
        corners: isHomeSg ? [5, 3] : [3, 5],
        possession: isHomeSg ? ["51%", "49%"] : ["49%", "51%"],
        totalShots: isHomeSg ? [7, 5] : [5, 7],
        shotsOnTarget: isHomeSg ? [4, 1] : [1, 4],
      }
    };
  }

  if (match.id === 'aff-m2-2' || ((match.teamHome.includes('Indonesia') && match.teamAway.includes('Kamboja')) || (match.teamHome.includes('Kamboja') && match.teamAway.includes('Indonesia')))) {
    const isHomeId = match.teamHome.includes('Indonesia');
    return {
      scoreHome: isHomeId ? 5 : 1,
      scoreAway: isHomeId ? 1 : 5,
      status: 'FULL TIME',
      stadium: 'Gelora Bung Karno Stadium, Jakarta',
      scorersHome: isHomeId ? ["Ramadhan Sananta 6', 15', 56'", "Sandy Walsh 24'", "Jens Raven 87'"] : ["Nadeo Argawinata 48' (OG)"],
      scorersAway: isHomeId ? ["Nadeo Argawinata 48' (OG)"] : ["Ramadhan Sananta 6', 15', 56'", "Sandy Walsh 24'", "Jens Raven 87'"],
      stats: {
        fouls: isHomeId ? [6, 8] : [8, 6],
        yellowCards: isHomeId ? [1, 1] : [1, 1],
        redCards: [0, 0] as [number, number],
        corners: isHomeId ? [4, 5] : [5, 4],
        possession: isHomeId ? ["67%", "33%"] : ["33%", "67%"],
        totalShots: isHomeId ? [17, 1] : [1, 17],
        shotsOnTarget: isHomeId ? [8, 1] : [1, 8],
      }
    };
  }

  if ((match.teamHome.includes('Timor') && match.teamAway.includes('Vietnam')) || (match.teamHome.includes('Vietnam') && match.teamAway.includes('Timor'))) {
    const isHomeTL = match.teamHome.includes('Timor');
    return {
      scoreHome: isHomeTL ? 0 : 7,
      scoreAway: isHomeTL ? 7 : 0,
      status: 'FULL TIME',
      stadium: 'Chonburi UTA Stadium, Chonburi',
      scorersHome: isHomeTL ? [] : ["Nguyễn Đình Bắc 14', 32', 55'", "Đỗ Hoàng Hên 61', 78'", "Nguyễn Quang Hải 84'", "Văn Vĩ 89'"],
      scorersAway: isHomeTL ? ["Nguyễn Đình Bắc 14', 32', 55'", "Đỗ Hoàng Hên 61', 78'", "Nguyễn Quang Hải 84'", "Văn Vĩ 89'"] : [],
      stats: {
        fouls: isHomeTL ? [4, 3] : [3, 4],
        yellowCards: isHomeTL ? [1, 0] : [0, 1],
        redCards: [0, 0] as [number, number],
        corners: isHomeTL ? [2, 6] : [6, 2],
        possession: isHomeTL ? ["40.5%", "59.5%"] : ["59.5%", "40.5%"],
        totalShots: isHomeTL ? [7, 23] : [23, 7],
        shotsOnTarget: isHomeTL ? [0, 10] : [10, 0],
      }
    };
  }

  if ((match.teamHome.includes('Kamboja') && match.teamAway.includes('Singapura')) || (match.teamHome.includes('Singapura') && match.teamAway.includes('Kamboja'))) {
    const isHomeCam = match.teamHome.includes('Kamboja');
    return {
      scoreHome: isHomeCam ? 1 : 2,
      scoreAway: isHomeCam ? 2 : 1,
      status: 'FULL TIME',
      stadium: 'Gelora Bung Karno Stadium, Jakarta',
      scorersHome: isHomeCam ? ["Sieng Chanthea 34'"] : ["Ilhan Fandi 21'", "Shawal Anuar 76'"],
      scorersAway: isHomeCam ? ["Ilhan Fandi 21'", "Shawal Anuar 76'"] : ["Sieng Chanthea 34'"],
      stats: {
        fouls: isHomeCam ? [11, 14] : [14, 11],
        yellowCards: isHomeCam ? [2, 1] : [1, 2],
        redCards: [0, 0] as [number, number],
        corners: isHomeCam ? [4, 5] : [5, 4],
        possession: isHomeCam ? ["45.2%", "54.8%"] : ["54.8%", "45.2%"],
        totalShots: isHomeCam ? [9, 13] : [13, 9],
        shotsOnTarget: isHomeCam ? [3, 6] : [6, 3],
      }
    };
  }

  if ((match.teamHome.includes('Myanmar') && match.teamAway.includes('Malaysia')) || (match.teamHome.includes('Malaysia') && match.teamAway.includes('Myanmar'))) {
    const isHomeMya = match.teamHome.includes('Myanmar');
    return {
      scoreHome: isHomeMya ? 1 : 2,
      scoreAway: isHomeMya ? 2 : 1,
      status: 'FULL TIME',
      stadium: 'Bukit Jalil National Stadium, KL',
      scorersHome: isHomeMya ? ["Maung Maung Lwin 45'"] : ["Paulo Josué 12', 68'"],
      scorersAway: isHomeMya ? ["Paulo Josué 12', 68'"] : ["Maung Maung Lwin 45'"],
      stats: {
        fouls: isHomeMya ? [13, 12] : [12, 13],
        yellowCards: isHomeMya ? [3, 2] : [2, 3],
        redCards: [0, 0] as [number, number],
        corners: isHomeMya ? [3, 7] : [7, 3],
        possession: isHomeMya ? ["42.0%", "58.0%"] : ["58.0%", "42.0%"],
        totalShots: isHomeMya ? [8, 15] : [15, 8],
        shotsOnTarget: isHomeMya ? [4, 7] : [7, 4],
      }
    };
  }

  if ((match.teamHome.includes('Laos') && match.teamAway.includes('Thailand')) || (match.teamHome.includes('Thailand') && match.teamAway.includes('Laos'))) {
    const isHomeLao = match.teamHome.includes('Laos');
    return {
      scoreHome: isHomeLao ? 0 : 5,
      scoreAway: isHomeLao ? 5 : 0,
      status: 'FULL TIME',
      stadium: 'My Dinh National Stadium, Hanoi',
      scorersHome: isHomeLao ? [] : ["Kakana Khamyok 18', 52'", "Teerasak Poeiphimai 39'", "Suphanat Mueanta 71'", "Sarach Yooyen 85'"],
      scorersAway: isHomeLao ? ["Kakana Khamyok 18', 52'", "Teerasak Poeiphimai 39'", "Suphanat Mueanta 71'", "Sarach Yooyen 85'"] : [],
      stats: {
        fouls: isHomeLao ? [9, 8] : [8, 9],
        yellowCards: isHomeLao ? [1, 1] : [1, 1],
        redCards: [0, 0] as [number, number],
        corners: isHomeLao ? [1, 9] : [9, 1],
        possession: isHomeLao ? ["32.5%", "67.5%"] : ["67.5%", "32.5%"],
        totalShots: isHomeLao ? [4, 19] : [19, 4],
        shotsOnTarget: isHomeLao ? [1, 11] : [11, 1],
      }
    };
  }

  if (match.id === 'aff-m2-4' || ((match.teamHome.includes('Malaysia') && match.teamAway.includes('Laos')) || (match.teamHome.includes('Laos') && match.teamAway.includes('Malaysia')))) {
    const isHomeMy = match.teamHome.includes('Malaysia');
    return {
      scoreHome: isHomeMy ? 4 : 0,
      scoreAway: isHomeMy ? 0 : 4,
      status: 'FULL TIME',
      stadium: 'Bukit Jalil National Stadium, KL',
      scorersHome: isHomeMy ? ["Paulo Josué 45'", "Endrick 57'", "Viengxay Sydavong 66' (OG)", "Wan Kuzain 84'"] : [],
      scorersAway: isHomeMy ? [] : ["Paulo Josué 45'", "Endrick 57'", "Viengxay Sydavong 66' (OG)", "Wan Kuzain 84'"],
      stats: {
        fouls: isHomeMy ? [5, 12] : [12, 5],
        yellowCards: isHomeMy ? [2, 3] : [3, 2],
        redCards: [0, 0] as [number, number],
        corners: isHomeMy ? [8, 2] : [2, 8],
        possession: isHomeMy ? ["70%", "30%"] : ["30%", "70%"],
        totalShots: isHomeMy ? [16, 8] : [8, 16],
        shotsOnTarget: isHomeMy ? [7, 3] : [3, 7],
        offsides: isHomeMy ? [4, 0] : [0, 4]
      }
    };
  }

  const hash = match.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  let sHome = typeof match.predictedHomeScore === 'number' ? match.predictedHomeScore : (hash % 4);
  let sAway = typeof match.predictedAwayScore === 'number' ? match.predictedAwayScore : ((hash * 3) % 4);
  if (match.predictedHomeScore === '?' || match.predictedAwayScore === '?') {
    sHome = (hash % 3) + 1;
    sAway = (hash % 2);
  }

  const stadiums = [
    'Gelora Bung Karno Stadium, Jakarta',
    'Chonburi UTA Stadium, Chonburi',
    'Bukit Jalil National Stadium, KL',
    'My Dinh National Stadium, Hanoi',
    'National Stadium, Singapore'
  ];
  const stadium = stadiums[hash % stadiums.length];

  const generateScorers = (team: string, count: number) => {
    if (count <= 0) return [];
    const names = teamScorersMap[team] || ['Striker Utama', 'Gelandang Serang', 'Sayap Kanan'];
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length];
      const minute = 15 + ((hash * (i + 3)) % 75);
      result.push(`${name} (${minute}')`);
    }
    return result;
  };

  const foulsHome = 5 + (hash % 10);
  const foulsAway = 6 + ((hash * 2) % 10);
  const ycHome = hash % 4;
  const ycAway = (hash * 3) % 4;
  const rcHome = hash % 15 === 0 ? 1 : 0;
  const rcAway = hash % 18 === 0 ? 1 : 0;
  const cornersHome = 3 + (hash % 7);
  const cornersAway = 2 + ((hash * 5) % 7);
  const possHome = 40 + (hash % 21);
  const possAway = 100 - possHome;
  const shotsHome = 6 + (hash % 15);
  const shotsAway = 5 + ((hash * 4) % 14);
  const sotHome = Math.min(shotsHome, sHome + 2 + (hash % 4));
  const sotAway = Math.min(shotsAway, sAway + 1 + ((hash * 2) % 4));
  const offsidesHome = 1 + (hash % 4);
  const offsidesAway = 1 + ((hash * 3) % 4);

  const details = {
    scoreHome: sHome,
    scoreAway: sAway,
    status: 'FULL TIME',
    stadium,
    scorersHome: generateScorers(match.teamHome, sHome),
    scorersAway: generateScorers(match.teamAway, sAway),
    stats: {
      fouls: [foulsHome, foulsAway] as [number, number],
      yellowCards: [ycHome, ycAway] as [number, number],
      redCards: [rcHome, rcAway] as [number, number],
      offsides: [offsidesHome, offsidesAway] as [number, number],
      corners: [cornersHome, cornersAway] as [number, number],
      possession: [`${possHome}%`, `${possAway}%`],
      totalShots: [shotsHome, shotsAway] as [number, number],
      shotsOnTarget: [sotHome, sotAway] as [number, number],
    }
  };

  if (liveInfo && (liveInfo.isLive || liveInfo.isFinished)) {
    const sH = liveInfo.scoreHome !== null && liveInfo.scoreHome !== undefined ? liveInfo.scoreHome : 0;
    const sA = liveInfo.scoreAway !== null && liveInfo.scoreAway !== undefined ? liveInfo.scoreAway : 0;
    
    let sHomeScorers = liveInfo.scorersHome || [];
    let sAwayScorers = liveInfo.scorersAway || [];
    
    if (sHomeScorers.length === 0 && sH > 0) {
      sHomeScorers = generateScorers(match.teamHome, sH);
    }
    if (sAwayScorers.length === 0 && sA > 0) {
      sAwayScorers = generateScorers(match.teamAway, sA);
    }

    return {
      ...details,
      scoreHome: sH,
      scoreAway: sA,
      status: liveInfo.isLive ? `LIVE - ${liveInfo.clock}` : 'FULL TIME',
      scorersHome: sHomeScorers,
      scorersAway: sAwayScorers,
      stats: liveInfo.stats || details.stats
    };
  }
  return details;
};

interface MatchesSectionProps {
  // no-op
}

export const MatchesSection: React.FC<MatchesSectionProps> = () => {
  const [viewMode, setViewMode] = useState<'jadwal' | 'prediksi'>('jadwal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('ALL');
  const [guessScores, setGuessScores] = useState<Record<string, { home: string; away: string }>>({});
  const [submittedGuess, setSubmittedGuess] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);

  const [espnScoreboard, setEspnScoreboard] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Clock tick interval
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch real-time scoreboard from backend proxy
    const fetchScoreboard = async () => {
      try {
        const res = await fetch('/api/espn/scoreboard');
        if (res.ok) {
          const data = await res.json();
          setEspnScoreboard(data);
        }
      } catch (err) {
        console.error("Error fetching ESPN scoreboard:", err);
      }
    };

    fetchScoreboard();
    const scoreboardInterval = setInterval(fetchScoreboard, 30000); // Poll every 30s

    return () => {
      clearInterval(clockInterval);
      clearInterval(scoreboardInterval);
    };
  }, []);

  const getLiveMatchInfo = (match: MatchItem) => {
    // 1. Check if ESPN scoreboard matches this event
    if (espnScoreboard && espnScoreboard.events) {
      const matchEvent = espnScoreboard.events.find((ev: any) => {
        const name = ev.name?.toLowerCase() || '';
        const homeName = match.teamHome.toLowerCase();
        const awayName = match.teamAway.toLowerCase();
        return (name.includes(homeName) && name.includes(awayName)) || 
               (name.includes(awayName) && name.includes(homeName));
      });
      
      if (matchEvent) {
        const status = matchEvent.status;
        const state = status?.type?.state;
        const isLive = state === 'in';
        const isFinished = state === 'post';
        
        let scoreHome = 0;
        let scoreAway = 0;
        const competitors = matchEvent.competitions?.[0]?.competitors || [];
        const homeComp = competitors.find((c: any) => c.homeAway === 'home');
        const awayComp = competitors.find((c: any) => c.homeAway === 'away');
        const homeId = homeComp?.id;
        const awayId = awayComp?.id;

        competitors.forEach((comp: any) => {
          const isHomeComp = comp.homeAway === 'home';
          const scoreVal = parseInt(comp.score || '0', 10);
          if (isHomeComp) {
            scoreHome = scoreVal;
          } else {
            scoreAway = scoreVal;
          }
        });

        const scorersHome: string[] = [];
        const scorersAway: string[] = [];
        const detailsList = matchEvent.competitions?.[0]?.details || [];
        
        detailsList.forEach((detail: any) => {
          const isGoal = detail.scoringPlay || (detail.type?.text?.toLowerCase().includes('goal'));
          if (isGoal) {
            const detailTeamId = detail.team?.id?.toString();
            const athlete = detail.athletesInvolved?.[0];
            let playerName = athlete ? athlete.displayName : '';
            if (!playerName) {
              const isHomeDetail = detailTeamId === homeId?.toString();
              const teamName = isHomeDetail ? match.teamHome : match.teamAway;
              const squad = teamScorersMap[teamName] || ['Striker Utama', 'Gelandang Serang', 'Sayap Kanan'];
              const currentScorersCount = isHomeDetail ? scorersHome.length : scorersAway.length;
              playerName = squad[currentScorersCount % squad.length];
            }
            const time = detail.clock?.displayValue || '';
            const goalStr = `${playerName} (${time})`;
            
            if (detailTeamId === homeId?.toString()) {
              scorersHome.push(goalStr);
            } else if (detailTeamId === awayId?.toString()) {
              scorersAway.push(goalStr);
            }
          }
        });

        // Parse stats from ESPN scoreboard statistics
        let ycHome = 0;
        let ycAway = 0;
        let rcHome = 0;
        let rcAway = 0;

        detailsList.forEach((detail: any) => {
          const detailTeamId = detail.team?.id?.toString();
          const isYellow = detail.yellowCard || detail.type?.text?.toLowerCase().includes('yellow card');
          const isRed = detail.redCard || detail.type?.text?.toLowerCase().includes('red card');
          if (isYellow) {
            if (detailTeamId === homeId?.toString()) ycHome++;
            else if (detailTeamId === awayId?.toString()) ycAway++;
          }
          if (isRed) {
            if (detailTeamId === homeId?.toString()) rcHome++;
            else if (detailTeamId === awayId?.toString()) rcAway++;
          }
        });

        const getStatValue = (compObj: any, statName: string, defaultVal: any) => {
          const statItem = compObj?.statistics?.find((s: any) => s.name === statName);
          return statItem ? statItem.displayValue : defaultVal;
        };

        const foulsHomeVal = parseInt(getStatValue(homeComp, 'foulsCommitted', '0'), 10);
        const foulsAwayVal = parseInt(getStatValue(awayComp, 'foulsCommitted', '0'), 10);
        const cornersHomeVal = parseInt(getStatValue(homeComp, 'wonCorners', '0'), 10);
        const cornersAwayVal = parseInt(getStatValue(awayComp, 'wonCorners', '0'), 10);
        const possHomeVal = getStatValue(homeComp, 'possessionPct', '50');
        const possAwayVal = getStatValue(awayComp, 'possessionPct', '50');
        const shotsHomeVal = parseInt(getStatValue(homeComp, 'totalShots', '0'), 10);
        const shotsAwayVal = parseInt(getStatValue(awayComp, 'totalShots', '0'), 10);
        const sotHomeVal = parseInt(getStatValue(homeComp, 'shotsOnTarget', '0'), 10);
        const sotAwayVal = parseInt(getStatValue(awayComp, 'shotsOnTarget', '0'), 10);

        const hash = match.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const offsidesHomeVal = 1 + (hash % 3);
        const offsidesAwayVal = 1 + ((hash * 2) % 3);

        const statsObj = {
          fouls: [foulsHomeVal || (5 + (hash % 10)), foulsAwayVal || (6 + ((hash * 2) % 10))] as [number, number],
          yellowCards: [ycHome, ycAway] as [number, number],
          redCards: [rcHome, rcAway] as [number, number],
          offsides: [offsidesHomeVal, offsidesAwayVal] as [number, number],
          corners: [cornersHomeVal || (3 + (hash % 7)), cornersAwayVal || (2 + ((hash * 5) % 7))] as [number, number],
          possession: [`${possHomeVal}%`, `${possAwayVal}%`],
          totalShots: [shotsHomeVal || (6 + (hash % 15)), shotsAwayVal || (5 + ((hash * 4) % 14))] as [number, number],
          shotsOnTarget: [sotHomeVal || Math.min(10, scoreHome + 2), sotAwayVal || Math.min(10, scoreAway + 1)] as [number, number],
        };
        
        return {
          isLive,
          isFinished,
          clock: status?.displayClock || status?.detail || 'LIVE',
          scoreHome,
          scoreAway,
          fromESPN: true,
          scorersHome,
          scorersAway,
          stats: statsObj
        };
      }
    }

    // 2. Simulated match progress (Fallback):
    // Malaysia vs Laos (aff-m2-4) is scheduled for "28 Juli 2026" at "20:00 WIB"
    if (match.id === 'aff-m2-4' || (match.date.includes('28 Juli 2026') && match.time.includes('20:00'))) {
      const startTime = new Date('2026-07-28T13:00:00Z'); // 20:00 WIB is 13:00 UTC
      const diffMs = currentTime.getTime() - startTime.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffSeconds = Math.floor((diffMs % 60000) / 1000);
      
      const isLive = diffMinutes >= 0 && diffMinutes < 105;
      
      if (isLive) {
        let secStr = diffSeconds.toString().padStart(2, '0');
        if (diffMinutes >= 45 && diffMinutes < 60) {
          return {
            isLive: true,
            isFinished: false,
            clock: 'HT',
            scoreHome: 1,
            scoreAway: 0,
            fromESPN: false,
            scorersHome: ["Paulo Josué (15')"],
            scorersAway: []
          };
        }
        
        let displayMin = diffMinutes;
        if (diffMinutes >= 60) {
          displayMin = diffMinutes - 15;
        }
        
        let clockVal = `${displayMin}:${secStr}`;
        if (displayMin > 90) {
          clockVal = `90+${displayMin - 90}`;
        }

        let simHome = 0;
        const simScorersHome: string[] = [];
        if (diffMinutes >= 15) {
          simHome = 1;
          simScorersHome.push("Paulo Josué (15')");
        }
        if (diffMinutes >= 68) {
          simHome = 2;
          simScorersHome.push("Arif Aiman (68')");
        }
        if (diffMinutes >= 80) {
          simHome = 3;
          simScorersHome.push("Safawi Rasid (80')");
        }

        return {
          isLive: true,
          isFinished: false,
          clock: clockVal,
          scoreHome: simHome,
          scoreAway: 0,
          fromESPN: false,
          scorersHome: simScorersHome,
          scorersAway: []
        };
      }
    }

    return {
      isLive: false,
      isFinished: isMatchFinished(match),
      clock: '',
      scoreHome: null,
      scoreAway: null,
      fromESPN: false
    };
  };

  const filteredMatches = MATCHES_DATA.filter((m) => {
    const matchesSearch =
      m.teamHome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.teamAway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.league.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedLeague === 'WORLD_CUP') {
      return matchesSearch && (m.league.includes('FASE GRUP') || m.league.includes('BABAK GUGUR') || m.league.includes('Matchday') || m.league.includes('Semifinal') || m.league.includes('Final') || m.league.includes('PIALA AFF'));
    }
    return matchesSearch;
  });

  const handleScoreChange = (id: string, team: 'home' | 'away', val: string) => {
    setGuessScores((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [team]: val,
      },
    }));
  };

  const handleGuessSubmit = (matchId: string) => {
    setSubmittedGuess(matchId);
    setTimeout(() => {
      setSubmittedGuess(null);
    }, 2500);
  };

  return (
    <section id="pertandingan" className="bg-transparent py-10 border-t border-[#0256C4]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Card Container */}
        <div className="rounded-3xl border-2 border-[#0256C4]/30 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_10px_35px_rgba(2,86,196,0.12)]">
          
          {/* Section Header & Toggle Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-7 w-2 rounded-full bg-[#0256C4] shadow-[0_0_10px_#0256C4]" />
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-[#0F172A] font-heading">
                {viewMode === 'jadwal' ? 'JADWAL PERTANDINGAN' : 'PREDIKSI PERTANDINGAN'}
              </h2>
            </div>

            {/* View Mode Switcher Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-[#EEF5FC] p-1 border border-[#0256C4]/30">
                <button
                  onClick={() => setViewMode('jadwal')}
                  className={`rounded-lg px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                    viewMode === 'jadwal'
                      ? 'bg-[#0256C4] text-[#FFFFFF] shadow-md'
                      : 'text-[#0256C4] hover:text-[#002B80]'
                  }`}
                >
                  JADWAL & HANDICAP
                </button>
                <button
                  onClick={() => setViewMode('prediksi')}
                  className={`rounded-lg px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                    viewMode === 'prediksi'
                      ? 'bg-[#0256C4] text-[#FFFFFF] shadow-md'
                      : 'text-[#0256C4] hover:text-[#002B80]'
                  }`}
                >
                  PREDIKSI KAPSUL4D
                </button>
              </div>

              <span className="rounded-xl border border-[#0256C4]/40 bg-[#EEF5FC] px-3 py-2 text-[11px] font-black text-[#0256C4]">
                {filteredMatches.length} MATCHES FOUND
              </span>
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black tracking-wider text-[#1E3A8A] uppercase">
                FILTER TURNAMEN / LIGA
              </label>
              <div className="relative">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-[#0256C4]/30 bg-[#F8FAFC] px-4 py-2.5 text-xs font-bold text-[#0F172A] focus:border-[#0256C4] focus:outline-none focus:ring-1 focus:ring-[#0256C4]"
                >
                  <option value="ALL">Semua Pertandingan ({MATCHES_DATA.length} Laga)</option>
                  <option value="WORLD_CUP">Piala AFF 2026</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0256C4]" />
              </div>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black tracking-wider text-[#1E3A8A] uppercase">
                CARI TIM ATAU KOMPETISI
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ketik nama negara atau klub..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#0256C4]/30 bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-xs font-bold text-[#0F172A] placeholder-[#64748B] focus:border-[#0256C4] focus:outline-none focus:ring-1 focus:ring-[#0256C4]"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0256C4]" />
              </div>
            </div>
          </div>

          {/* Matches Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {filteredMatches.map((match) => {
              const liveInfo = getLiveMatchInfo(match);
              const isFinished = liveInfo.isLive ? false : (liveInfo.isFinished !== undefined ? liveInfo.isFinished : isMatchFinished(match));
              const details = getMatchDetails(match, liveInfo);
              return (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="rounded-2xl border-2 border-[#0256C4]/20 bg-[#FFFFFF] p-4 space-y-3 transition-all duration-300 hover:border-[#0256C4] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(2,86,196,0.35)] cursor-pointer"
              >
                {/* Card Header: League Title & Date */}
                <div className="flex items-center justify-between text-[10px] font-black border-b border-slate-200 pb-2">
                  <span className="truncate max-w-[220px] rounded-md bg-[#EEF5FC] px-2 py-0.5 text-[#0256C4] border border-[#0256C4]/30">
                    {match.league}
                  </span>
                  {liveInfo.isLive ? (
                    <span className="font-mono text-emerald-600 font-black animate-pulse flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                      {liveInfo.clock}
                    </span>
                  ) : (
                    <span className="text-[#64748B] font-mono">
                      📅 {match.date} - {match.time}
                    </span>
                  )}
                </div>

                {/* Main Match Info Row: Team Names horizontally aligned with VS / Score */}
                <div className="flex items-center justify-between py-2 px-1 sm:px-2">
                  {/* Home Team (Logo at outer left edge, Name aligned towards center) */}
                  <div className="flex items-center gap-2 sm:gap-3 w-[38%] justify-start min-w-0">
                    <FlagIcon flag={match.flagHome} country={match.teamHome} className="h-6 w-8 sm:h-7 sm:w-10 object-cover rounded-md shadow-sm border border-slate-300 shrink-0" />
                    <span className="text-xs sm:text-base font-extrabold text-[#0F172A] truncate">
                      {match.teamHome}
                    </span>
                  </div>

                  {/* Center Info: VS OR Score strictly aligned horizontally */}
                  <div className="flex items-center justify-center w-[24%] px-1 text-center shrink-0">
                    {liveInfo.isLive ? (
                      <div className="text-sm sm:text-lg font-black text-emerald-600 font-score whitespace-nowrap animate-pulse">
                        {liveInfo.scoreHome} - {liveInfo.scoreAway}
                      </div>
                    ) : viewMode === 'jadwal' ? (
                      isFinished ? (
                        <div className="text-sm sm:text-lg font-black text-[#0256C4] font-score whitespace-nowrap">
                          {details.scoreHome} - {details.scoreAway}
                        </div>
                      ) : match.handicap === '?' || match.league.includes('BABAK GUGUR') ? (
                        <span className="rounded-md bg-[#0256C4] px-3 py-1 text-xs font-black text-[#FFFFFF]">
                          ?
                        </span>
                      ) : (
                        <span className="rounded-lg bg-[#0256C4] px-3 py-1 text-xs sm:text-sm font-black text-[#FFFFFF] shadow-sm">
                          VS
                        </span>
                      )
                    ) : (
                      isFinished ? (
                        <div className="text-sm sm:text-lg font-black text-[#0256C4] font-score whitespace-nowrap">
                          {details.scoreHome} - {details.scoreAway}
                        </div>
                      ) : match.predictionOutcome === '?' || match.predictedHomeScore === '?' || match.league.includes('BABAK GUGUR') ? (
                        <div className="text-sm sm:text-lg font-black text-[#0256C4] font-score whitespace-nowrap">
                          ? - ?
                        </div>
                      ) : (
                        <div className="text-sm sm:text-lg font-black text-[#0256C4] font-score whitespace-nowrap">
                          {match.predictedHomeScore} - {match.predictedAwayScore}
                        </div>
                      )
                    )}
                  </div>

                  {/* Away Team (Name aligned towards center, Logo at outer right edge) */}
                  <div className="flex items-center gap-2 sm:gap-3 w-[38%] justify-end text-right min-w-0">
                    <span className="text-xs sm:text-base font-extrabold text-[#0F172A] truncate">
                      {match.teamAway}
                    </span>
                    <FlagIcon flag={match.flagAway} country={match.teamAway} className="h-6 w-8 sm:h-7 sm:w-10 object-cover rounded-md shadow-sm border border-slate-300 shrink-0" />
                  </div>
                </div>

                {/* Sub-row for Handicap / Match Status / Prediction Outcome (placed lower down approaching separator line) */}
                <div className="flex items-center justify-center pb-2 pt-0.5">
                  {liveInfo.isLive ? (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 uppercase shadow-sm animate-pulse flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                      PERTANDINGAN BERLANGSUNG
                    </span>
                  ) : viewMode === 'jadwal' ? (
                    isFinished ? (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 uppercase shadow-sm">
                        FULL TIME
                      </span>
                    ) : match.handicap === '?' || match.league.includes('BABAK GUGUR') ? (
                      <span className="rounded-md bg-[#EEF5FC] border border-[#0256C4]/30 px-3 py-0.5 text-[11px] font-mono font-black text-[#64748B]">
                        HDP : ?
                      </span>
                    ) : (
                      <span className="rounded-md bg-[#EEF5FC] border border-[#0256C4]/30 px-3 py-0.5 text-xs sm:text-sm font-mono font-black text-[#0256C4] shadow-sm">
                        HDP {match.handicap}
                      </span>
                    )
                  ) : (
                    match.predictionOutcome === '?' || match.league.includes('BABAK GUGUR') ? (
                      <span className="rounded-md px-3 py-0.5 text-[10px] sm:text-xs font-black tracking-wider bg-[#0256C4]/10 text-[#0256C4] border border-[#0256C4]/30">
                        PREDIKSI : ?
                      </span>
                    ) : (
                      <span
                        className={`rounded-md px-3 py-0.5 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-sm ${
                          match.predictionOutcome === 'HOME WIN'
                            ? 'bg-[#0256C4]/10 text-[#0256C4] border border-[#0256C4]/30'
                            : match.predictionOutcome === 'AWAY WIN'
                            ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-700 border border-amber-500/30'
                        }`}
                      >
                        {match.predictionOutcome}
                      </span>
                    )
                  )}
                </div>

                {/* Bottom Card Bar: Analysis & Score Guessing Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2 text-[10px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#0256C4]">
                    <Sparkles className="h-3.5 w-3.5 text-[#0256C4]" />
                    <span>Analisis Handicap Pasaran Kapsul4D</span>
                  </div>

                  {/* Score guessing form */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="-"
                      value={guessScores[match.id]?.home || ''}
                      onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                      className="h-6 w-7 rounded border border-[#0256C4]/40 bg-[#F1F5F9] text-center text-xs font-mono font-bold text-[#0F172A] focus:border-[#0256C4] focus:outline-none"
                    />
                    <span className="text-[#64748B] font-bold">-</span>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="-"
                      value={guessScores[match.id]?.away || ''}
                      onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                      className="h-6 w-7 rounded border border-[#0256C4]/40 bg-[#F1F5F9] text-center text-xs font-mono font-bold text-[#0F172A] focus:border-[#0256C4] focus:outline-none"
                    />
                    <button
                      onClick={() => handleGuessSubmit(match.id)}
                      className="rounded bg-[#0256C4] px-2.5 py-1 text-[10px] font-black text-[#FFFFFF] hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                    >
                      TEBAK
                    </button>
                  </div>
                </div>

                {submittedGuess === match.id && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Tebakan Skor Berhasil Dikirim!</span>
                  </div>
                )}
              </div>
            );
            })}
          </div>

          {/* Bottom Action Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setSelectedLeague('ALL');
                setSearchQuery('');
              }}
              className="rounded-xl bg-[#0256C4] px-8 py-3.5 text-xs font-black text-[#FFFFFF] shadow-[0_4px_20px_rgba(2,86,196,0.35)] transition-all hover:bg-[#1D4ED8] hover:shadow-[0_6px_25px_rgba(2,86,196,0.45)] active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              LIHAT SEMUA {viewMode === 'jadwal' ? 'JADWAL' : 'PREDIKSI'} ({MATCHES_DATA.length} MATCH)
            </button>
          </div>

        </div>

        {/* Match Statistics Modal */}
        {selectedMatch && (() => {
          const liveInfo = getLiveMatchInfo(selectedMatch);
          const details = getMatchDetails(selectedMatch, liveInfo);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedMatch(null)}>
              <div
                className="relative w-full max-w-xl rounded-3xl border-2 border-[#0095FF] bg-[#FFFFFF] p-6 text-[#0F172A] shadow-[0_0_60px_rgba(0,149,255,0.65)] space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs sm:text-sm font-black tracking-widest text-[#0256C4] uppercase font-mono">
                    {selectedMatch.league}
                  </span>
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-[#0256C4] hover:text-white transition-all cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Score & Teams Section */}
                <div className="flex flex-col py-4 px-2 sm:px-6 bg-[#EEF5FC]/70 rounded-2xl border border-[#0256C4]/30">
                  {/* Top Row: Logos, Team Names, and Score strictly aligned horizontally */}
                  <div className="flex items-center justify-between w-full">
                    {/* Home Team */}
                    <div className="flex flex-col items-center text-center w-[36%] space-y-2 min-w-0">
                      <FlagIcon flag={selectedMatch.flagHome} country={selectedMatch.teamHome} className="h-10 w-14 sm:h-12 sm:w-16 object-cover rounded-lg shadow-md border border-slate-300 shrink-0" />
                      <span className="text-xs sm:text-base font-extrabold text-[#0F172A] truncate w-full">
                        {selectedMatch.teamHome}
                      </span>
                    </div>

                    {/* Center Score & Status */}
                    <div className="flex flex-col items-center justify-center w-[28%] px-1 text-center shrink-0">
                      <div className={`text-lg sm:text-2xl font-black font-score whitespace-nowrap ${liveInfo.isLive ? 'text-emerald-600 animate-pulse' : 'text-[#0256C4]'}`}>
                        {details.scoreHome} : {details.scoreAway}
                      </div>
                      <span className={`mt-1.5 rounded-full px-3 py-1 text-[9px] sm:text-[10px] font-black tracking-widest text-white uppercase shadow-sm whitespace-nowrap ${liveInfo.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-[#0256C4]'}`}>
                        {details.status}
                      </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center text-center w-[36%] space-y-2 min-w-0">
                      <FlagIcon flag={selectedMatch.flagAway} country={selectedMatch.teamAway} className="h-10 w-14 sm:h-12 sm:w-16 object-cover rounded-lg shadow-md border border-slate-300 shrink-0" />
                      <span className="text-xs sm:text-base font-extrabold text-[#0F172A] truncate w-full">
                        {selectedMatch.teamAway}
                      </span>
                    </div>
                  </div>

                  {/* Goal Scorers Row (placed below so logos stay aligned) */}
                  {(details.scorersHome.length > 0 || details.scorersAway.length > 0) && (
                    <div className="flex items-start justify-between w-full mt-3 pt-3 border-t border-[#0256C4]/20">
                      {/* Goal Scorers Home */}
                      <div className="w-[36%] text-center space-y-1 text-[11px] font-bold text-emerald-700 min-w-0 px-0.5">
                        {details.scorersHome.map((s, idx) => (
                          <div key={idx} className="flex items-start justify-center gap-1 leading-tight">
                            <span className="shrink-0">⚽</span>
                            <span className="break-words">{s}</span>
                          </div>
                        ))}
                      </div>

                      {/* Center Spacer / Label */}
                      <div className="w-[28%] text-center text-[10px] font-bold text-[#64748B] pt-0.5 uppercase tracking-wider">
                        Pencetak Gol
                      </div>

                      {/* Goal Scorers Away */}
                      <div className="w-[36%] text-center space-y-1 text-[11px] font-bold text-emerald-700 min-w-0 px-0.5">
                        {details.scorersAway.map((s, idx) => (
                          <div key={idx} className="flex items-start justify-center gap-1 leading-tight">
                            <span className="shrink-0">⚽</span>
                            <span className="break-words">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Date & Stadium */}
                <div className="text-center space-y-1 py-1 border-b border-slate-200 pb-3 text-xs font-bold text-[#475569]">
                  <div className="font-mono">📅 {selectedMatch.date} - {selectedMatch.time}</div>
                  <div className="flex items-center justify-center gap-1 text-[#0256C4]">
                    <span>📍</span>
                    <span>{details.stadium}</span>
                  </div>
                </div>

                {/* Section Title in English */}
                <div className="text-center pt-1">
                  <h4 className="text-xs sm:text-sm font-black tracking-widest text-[#0256C4] uppercase font-heading">
                    MATCH STATISTICS
                  </h4>
                </div>

                {/* Stat Rows in English */}
                <div className="space-y-3 px-2 sm:px-6 pb-2">
                  {[
                    { label: 'FOULS', home: details.stats.fouls[0], away: details.stats.fouls[1] },
                    { label: 'YELLOW CARDS', home: details.stats.yellowCards[0], away: details.stats.yellowCards[1] },
                    { label: 'RED CARDS', home: details.stats.redCards[0], away: details.stats.redCards[1] },
                    { label: 'OFFSIDES', home: details.stats.fouls[0] === '-' ? '-' : ((details.stats as any).offsides ? (details.stats as any).offsides[0] : 0), away: details.stats.fouls[0] === '-' ? '-' : ((details.stats as any).offsides ? (details.stats as any).offsides[1] : 0) },
                    { label: 'CORNERS', home: details.stats.corners[0], away: details.stats.corners[1] },
                    { label: 'BALL POSSESSION', home: details.stats.possession[0], away: details.stats.possession[1] },
                    { label: 'TOTAL SHOTS', home: details.stats.totalShots[0], away: details.stats.totalShots[1] },
                    { label: 'SHOTS ON TARGET', home: details.stats.shotsOnTarget[0], away: details.stats.shotsOnTarget[1] },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-black border-b border-slate-100 pb-2 last:border-b-0">
                      <span className="w-1/4 text-left text-[#0256C4] font-mono text-sm sm:text-base font-extrabold">{stat.home}</span>
                      <span className="w-2/4 text-center text-slate-600 tracking-wider text-[11px] sm:text-xs uppercase font-extrabold">{stat.label}</span>
                      <span className="w-1/4 text-right text-[#0256C4] font-mono text-sm sm:text-base font-extrabold">{stat.away}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
