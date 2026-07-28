import React from 'react';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <section className="relative overflow-hidden bg-transparent pt-4 pb-6">
      {/* Background Stadium Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[900px] bg-[#0256C4]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 h-72 w-72 bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-3 sm:px-6 relative z-10 space-y-4">

        {/* Main Hero Banner Graphic Image */}
        <a 
          href="https://shortq.net/login-kapsul4d"
          target="_blank"
          rel="noopener noreferrer"
          className="block group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-[#0256C4] bg-[#FFFFFF] shadow-[0_10px_35px_rgba(2,86,196,0.25)] hover:border-[#1D4ED8] hover:shadow-[0_15px_45px_rgba(2,86,196,0.35)] transition-all duration-300"
        >
          <img
            src="https://ik.imagekit.io/srri8ez3b/affcup2026"
            alt="PIALA AFF U19 CHAMPIONSHIP 2026 KAPSUL4D"
            className="w-full h-auto object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Subtle glossy overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0256C4]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </a>

      </div>
    </section>
  );
};
