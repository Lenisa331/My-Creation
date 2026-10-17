import React from 'react';
import { Surah } from '../types/quiz';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Type,
  Home,
  Users,
} from 'lucide-react';
import { playClick } from '../utils/audio';

interface HeaderNavProps {
  currentSurah: Surah;
  onOpenSurahModal: () => void;
  onOpenStudentModal: () => void;
  fontSizeScale: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (scale: 'normal' | 'large' | 'xlarge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReturnHome: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSurah,
  onOpenSurahModal,
  onOpenStudentModal,
  fontSizeScale,
  onChangeFontSize,
  soundEnabled,
  onToggleSound,
  onReturnHome,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="w-full bg-[#03150c]/95 border-b border-emerald-800/80 sticky top-0 z-40 backdrop-blur-md px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: App Title and Home Return */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playClick();
              onReturnHome();
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition-colors"
            title="Kembali ke Beranda"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold hidden md:inline">Beranda</span>
          </button>

          <div className="hidden sm:block">
            <h1 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-1.5">
              <span>TAHFIDZ CILIK</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800 text-amber-300 font-bold">
                JUZ 30
              </span>
            </h1>
          </div>
        </div>

        {/* Center: Surah Selector Button (Guru can pick from 37 surahs anytime!) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              onOpenSurahModal();
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 border border-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            title="Klik untuk memilih dari 37 Surah Juz 30"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="truncate max-w-[130px] sm:max-w-[200px]">
              {currentSurah.number}. {currentSurah.name}
            </span>
            <span className="font-quran text-amber-300 text-sm hidden sm:inline ml-1">
              ({currentSurah.arabicName})
            </span>
            <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300 border border-emerald-700">
              Ganti ▾
            </span>
          </button>
        </div>

        {/* Right: Projector Utilities (Font Scale, Fullscreen, Sound, Students) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Scale Changer for Projector distance adjustment */}
          <div className="flex items-center bg-emerald-950/80 border border-emerald-800 rounded-xl p-0.5">
            <button
              onClick={() => {
                playClick();
                onChangeFontSize(
                  fontSizeScale === 'normal'
                    ? 'large'
                    : fontSizeScale === 'large'
                    ? 'xlarge'
                    : 'normal'
                );
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-emerald-200 hover:bg-emerald-900 transition-colors"
              title="Ubah ukuran huruf Arab untuk proyektor"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px]">
                {fontSizeScale === 'normal' ? 'Font: Sedang' : fontSizeScale === 'large' ? 'Font: Besar' : 'Font: Jumbo'}
              </span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playClick();
              onToggleSound();
            }}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:bg-emerald-900'
                : 'bg-red-950/40 border-red-800 text-red-300'
            }`}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle for Projector */}
          <button
            onClick={() => {
              playClick();
              onToggleFullscreen();
            }}
            className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Proyektor)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
