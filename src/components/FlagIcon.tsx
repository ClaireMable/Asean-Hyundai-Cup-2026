import React from 'react';

// Country name / emoji / code to FlagCDN ISO code mapping
const COUNTRY_CODE_MAP: Record<string, string> = {
  // ASEAN Countries
  indonesia: 'id',
  '🇲🇨': 'id',
  id: 'id',

  vietnam: 'vn',
  '🇻🇳': 'vn',
  vn: 'vn',

  thailand: 'th',
  '🇹🇭': 'th',
  th: 'th',

  malaysia: 'my',
  '🇲🇾': 'my',
  my: 'my',

  singapura: 'sg',
  '🇸🇬': 'sg',
  sg: 'sg',

  philippines: 'ph',
  filipina: 'ph',
  '🇵🇭': 'ph',
  ph: 'ph',

  myanmar: 'mm',
  '🇲🇲': 'mm',
  mm: 'mm',

  cambodia: 'kh',
  kamboja: 'kh',
  '🇰🇭': 'kh',
  kh: 'kh',

  laos: 'la',
  '🇱🇦': 'la',
  la: 'la',

  'timor-leste': 'tl',
  'timor leste': 'tl',
  '🇹🇱': 'tl',
  tl: 'tl',

  brunei: 'bn',
  '🇧🇳': 'bn',
  bn: 'bn',

  // Other Global / Asian teams
  japan: 'jp',
  jepang: 'jp',
  '🇯🇵': 'jp',
  
  'south korea': 'kr',
  'korea selatan': 'kr',
  korea: 'kr',
  '🇰🇷': 'kr',

  australia: 'au',
  '🇦🇺': 'au',

  'saudi arabia': 'sa',
  'arab saudi': 'sa',
  '🇸🇦': 'sa',

  usa: 'us',
  '🇺🇸': 'us',

  canada: 'ca',
  '🇨🇦': 'ca',

  mexico: 'mx',
  '🇲🇽': 'mx',

  brazil: 'br',
  '🇧🇷': 'br',

  argentina: 'ar',
  '🇦🇷': 'ar',

  france: 'fr',
  '🇫🇷': 'fr',

  spain: 'es',
  '🇪🇸': 'es',

  england: 'gb-eng',
  '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'gb-eng',
};

export function getFlagCdnUrl(input: string): string | null {
  if (!input) return null;
  
  // If it's already a full URL
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return input;
  }

  const clean = input.trim().toLowerCase();
  const code = COUNTRY_CODE_MAP[clean];
  if (code) {
    return `https://flagcdn.com/w320/${code}.png`;
  }
  return null;
}

interface FlagIconProps {
  flag?: string;
  country?: string;
  className?: string;
  alt?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  flag,
  country,
  className = 'h-6 w-8 object-fill rounded shadow-sm border border-white/20',
  alt = 'Flag',
}) => {
  const flagUrl = getFlagCdnUrl(flag || '') || getFlagCdnUrl(country || '');

  // Ensure object-cover and object-contain are replaced by object-fill so all flags completely fill their box without white space or cropping
  let safeClassName = className
    .replace('object-cover', 'object-fill')
    .replace('object-contain', 'object-fill');
  
  if (!safeClassName.includes('object-fill')) {
    safeClassName += ' object-fill';
  }

  if (flagUrl) {
    return (
      <img
        src={flagUrl}
        alt={alt || country || 'Country flag'}
        className={safeClassName}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if CDN fails
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    );
  }

  // Fallback to emoji or raw string if not mapped
  return <span className="inline-block font-sans">{flag || country}</span>;
};
