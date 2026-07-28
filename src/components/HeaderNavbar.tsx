import React from 'react';
import { Trophy, LogIn } from 'lucide-react';

interface HeaderNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems = [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'pertandingan', label: 'PERTANDINGAN' },
    { id: 'grup', label: 'GRUP' },
    { id: 'bracket', label: 'BRACKET' },
    { id: 'statistik', label: 'STATISTIK' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#0256C4]/30 bg-gradient-to-r from-[#002B80] via-[#0256C4] to-[#002B80] text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <a
          href="https://shortq.net/login-kapsul4d"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
        >
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#030712] border-2 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.5)] overflow-hidden p-0.5 shrink-0">
            <img
              src="https://ik.imagekit.io/srri8ez3b/kapsul4dlogo"
              alt="KAPSUL4D Logo"
              className="h-full w-full object-cover rounded-lg"
              loading="eager"
            />
          </div>
          <div className="text-left">
            <div className="text-xl sm:text-2xl font-black tracking-wider text-[#FFFFFF] font-heading leading-tight drop-shadow-sm">
              KAPSUL<span className="text-[#38BDF8]">4D</span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-amber-300 uppercase">
              PIALA AFF 2026
            </div>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-black tracking-wider text-[#E0F2FE]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative py-1.5 transition-colors uppercase hover:text-[#38BDF8] cursor-pointer ${
                  isActive ? 'text-[#FFFFFF] font-black' : 'text-[#E0F2FE] hover:text-[#FFFFFF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-1 w-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: LOGIN Button */}
        <a
          href="https://shortq.net/login-kapsul4d"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-[#030712] border-2 border-[#38BDF8] px-5 py-2 text-xs font-black text-[#FFFFFF] shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all hover:bg-[#0F172A] hover:border-[#60A5FA] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>LOGIN</span>
          <LogIn className="h-4 w-4 stroke-[3] text-[#38BDF8]" />
        </a>
      </div>

      {/* Mobile Nav Row */}
      <div className="flex md:hidden items-center justify-around border-t border-white/20 bg-[#001D54] px-2 py-2 text-[10px] font-black text-[#E0F2FE]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-2 py-1 transition-colors cursor-pointer ${
              activeTab === item.id
                ? 'text-[#38BDF8] border-b-2 border-[#38BDF8]'
                : 'hover:text-[#FFFFFF]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
