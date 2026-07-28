import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#FFFFFF] text-[#475569] border-t-2 border-[#0256C4]/20 pt-16 pb-12 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
        
        {/* Top Footer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info (Spans 5 columns on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="https://shortq.net/login-kapsul4d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030712] border-2 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.5)] overflow-hidden p-0.5 shrink-0">
                <img
                  src="https://ik.imagekit.io/srri8ez3b/kapsul4dlogo"
                  alt="KAPSUL4D Logo"
                  className="h-full w-full object-cover rounded-lg"
                  loading="eager"
                />
              </div>
              <div className="text-left">
                <div className="text-xl font-black tracking-wider text-[#0F172A] font-heading leading-tight drop-shadow-sm">
                  KAPSUL<span className="text-[#0256C4]">4D</span>
                </div>
                <div className="text-[9px] font-black tracking-widest text-[#0256C4] uppercase">
                  PIALA AFF 2026
                </div>
              </div>
            </a>

            <p className="text-xs text-[#64748B] leading-relaxed max-w-sm">
              Sumber informasi resmi seputar Piala AFF 2026 Asia Tenggara. Dapatkan update terbaru, jadwal pertandingan, klasemen, dan statistik terlengkap.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <ul className="example-2 flex flex-wrap gap-3">
                {/* Telegram */}
                <li className="icon-content" data-social="telegram">
                  <a href="https://telegram.me/Kapsul4D_TeleOfficial" target="_blank" rel="noopener noreferrer" data-social="telegram" aria-label="Telegram">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Telegram</div>
                </li>

                {/* Twitter / X */}
                <li className="icon-content" data-social="twitter">
                  <a href="https://x.com/Kapsul4D_Trendz" target="_blank" rel="noopener noreferrer" data-social="twitter" aria-label="Twitter">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Twitter</div>
                </li>

                {/* Whatsapp */}
                <li className="icon-content" data-social="whatsapp">
                  <a href="http://wa.me/6282113530838" target="_blank" rel="noopener noreferrer" data-social="whatsapp" aria-label="Whatsapp">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.996 0C5.372 0 0 5.373 0 11.998c0 2.122.556 4.195 1.613 6.012L.055 24l6.162-1.616a11.936 11.936 0 0 0 5.779 1.487h.005c6.623 0 11.997-5.373 11.997-11.998A11.933 11.933 0 0 0 19.467 3.51 11.931 11.931 0 0 0 11.996 0zM12 21.84h-.005a9.904 9.904 0 0 1-5.05-1.382l-.362-.215-3.754.985 1.002-3.659-.236-.376A9.901 9.901 0 0 1 2.05 12c0-5.485 4.46-9.948 9.95-9.948 2.658 0 5.156 1.035 7.035 2.915s2.913 4.377 2.913 7.037c-.001 5.486-4.462 9.949-9.948 9.936zm5.457-7.442c-.299-.15-1.769-.873-2.043-.973-.274-.101-.473-.15-.673.15-.199.299-.773.973-.948 1.173-.174.199-.348.224-.647.075-.299-.15-1.262-.465-2.404-1.482-.889-.791-1.489-1.769-1.663-2.068-.175-.299-.019-.461.131-.611.135-.135.299-.349.448-.523.149-.175.199-.299.299-.499.1-.199.05-.374-.025-.524-.075-.15-.673-1.622-.923-2.222-.243-.583-.49-.504-.673-.513-.175-.008-.374-.01-.573-.01-.199 0-.523.075-.798.374-.274.299-1.047 1.022-1.047 2.493 0 1.472 1.072 2.894 1.222 3.094.15.199 2.11 3.222 5.111 4.517.714.308 1.272.492 1.706.63.717.228 1.371.196 1.889.119.578-.086 1.769-.723 2.018-1.422.249-.698.249-1.297.174-1.422-.075-.125-.274-.199-.573-.349z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Whatsapp</div>
                </li>

                {/* Instagram */}
                <li className="icon-content" data-social="instagram">
                  <a href="https://www.instagram.com/pusatkapsulsga/" target="_blank" rel="noopener noreferrer" data-social="instagram" aria-label="Instagram">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Instagram</div>
                </li>

                {/* Pinterest */}
                <li className="icon-content" data-social="pinterest">
                  <a href="https://id.pinterest.com/kapsul4dofficial/" target="_blank" rel="noopener noreferrer" data-social="pinterest" aria-label="Pinterest">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.332 1.363-.059.237-.197.287-.453.168-1.696-.789-2.758-3.267-2.758-5.267 0-4.288 3.118-8.231 8.991-8.231 4.729 0 8.406 3.371 8.406 7.876 0 4.701-2.963 8.487-7.078 8.487-1.381 0-2.68-.718-3.125-1.564 0 0-.684 2.604-.848 3.242-.308 1.186-1.141 2.671-1.698 3.582.918.283 1.887.436 2.894.436 6.621 0 11.988-5.367 11.988-11.987C23.97 5.396 18.604.001 12.017.001z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Pinterest</div>
                </li>

                {/* Tiktok */}
                <li className="icon-content" data-social="tiktok">
                  <a href="https://www.tiktok.com/@kapsul4dfootballl" target="_blank" rel="noopener noreferrer" data-social="tiktok" aria-label="Tiktok">
                    <div className="filled"></div>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <div className="tooltip font-heading font-bold">Tiktok</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Nav Columns Grid (Spans 7 columns on lg, tightly grouped) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-[480px] lg:ml-auto">
            
            {/* Nav Column 1: MENU */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-black tracking-wider text-[#0F172A] font-heading uppercase">
                MENU
              </h4>
              <ul className="space-y-1 text-xs font-bold text-[#64748B]">
                <li>
                  <button onClick={() => onSelectTab('beranda')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Beranda
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('pertandingan')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Pertandingan
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('grup')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Grup
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('grup')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Klasemen
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('statistik')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Statistik
                  </button>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: TURNAMEN */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-black tracking-wider text-[#0F172A] font-heading uppercase">
                TURNAMEN
              </h4>
              <ul className="space-y-1 text-xs font-bold text-[#64748B]">
                <li>
                  <button onClick={() => onSelectTab('pertandingan')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Jadwal
                  </button>
                </li>
                <li>
                  <a href="#stadion" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    Stadion
                  </a>
                </li>
                <li>
                  <button onClick={() => onSelectTab('grup')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Tim Peserta
                  </button>
                </li>
                <li>
                  <a href="#sejarah" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    Sejarah
                  </a>
                </li>
                <li>
                  <button onClick={() => onSelectTab('statistik')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Statistik
                  </button>
                </li>
              </ul>
            </div>

            {/* Nav Column 3: BANTUAN */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-black tracking-wider text-[#0F172A] font-heading uppercase">
                BANTUAN
              </h4>
              <ul className="space-y-1 text-xs font-bold text-[#64748B]">
                <li>
                  <button onClick={() => onSelectTab('statistik')} className="py-0.5 hover:text-[#0256C4] transition-colors cursor-pointer block">
                    Statistik Kami
                  </button>
                </li>
                <li>
                  <a href="#kontak" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    Kontak
                  </a>
                </li>
                <li>
                  <a href="#privasi" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#syarat" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#faq" className="py-0.5 hover:text-[#0256C4] transition-colors block">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between text-[11px] font-bold text-[#64748B]">
          <div>© 2026 Kapsul4D Piala AFF Portal. All rights reserved.</div>
          <div className="text-[#0256C4]">Royal Blue Edition 2026</div>
        </div>

      </div>
    </footer>
  );
};
