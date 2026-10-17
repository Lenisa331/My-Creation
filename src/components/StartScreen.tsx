import React from 'react';
import { Surah, Student } from '../types/quiz';
import { JUZ_30_SURAHS } from '../data/juz30Surahs';
import {
  Play,
  BookOpen,
  Users,
  Tv,
  Star,
  Sparkles,
  Award,
  Volume2,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import { playClick } from '../utils/audio';

interface StartScreenProps {
  selectedSurah: Surah;
  onOpenSurahModal: () => void;
  onSelectSurah: (surah: Surah) => void;
  students: Student[];
  currentStudent: Student | null;
  onOpenStudentModal: () => void;
  onStartQuiz: () => void;
  onToggleFullscreen: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  selectedSurah,
  onOpenSurahModal,
  onSelectSurah,
  students,
  currentStudent,
  onOpenStudentModal,
  onStartQuiz,
  onToggleFullscreen,
}) => {
  // Frequently chosen surahs for children in TPA / Madrasah
  const quickSurahs = [78, 87, 88, 93, 97, 99, 107, 108, 109, 112, 113, 114];

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Islamic Geometric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-600/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[120px]" />
      </div>

      {/* Top Banner & Title Lockup */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center pt-2 sm:pt-4">
        {/* Subtle decorative Quranic Bismillah */}
        <p className="font-quran text-2xl sm:text-3xl text-emerald-400/90 mb-2 select-none" dir="rtl">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        {/* Title Lockup */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Game Tahfidz Sambung Ayat Juz 30 • Khusus Proyektor & HP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          TAHFIDZ CILIK{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-300">
            JUZ 30
          </span>
        </h1>
        <p className="text-xs sm:text-base text-emerald-400/90 mt-2 max-w-2xl mx-auto">
          Anak maju satu per satu ke depan layar proyektor untuk menyambung potongan ayat secara lisan. Guru mengendalikan kuis langsung dari HP.
        </p>
      </div>

      {/* Middle Section: Kolom-Kolom Hijau Tua (Dark Green Columns) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-6 sm:my-8">
        {/* Column 1: Pilihan Surah Yang Diujikan */}
        <div className="rounded-2xl bg-[#042414] border-2 border-emerald-700/80 p-5 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-emerald-800/60 pb-2.5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-emerald-100 uppercase tracking-wide">
                  Surah Yang Diujikan
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                5 Soal
              </span>
            </div>

            {/* Currently Active Surah Badge */}
            <div className="p-3.5 rounded-xl bg-[#02130a] border border-amber-400/60 shadow-inner mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Surah Terpilih:
                  </span>
                  <h4 className="text-lg font-black text-white">
                    {selectedSurah.number}. {selectedSurah.name}
                  </h4>
                  <p className="text-xs text-emerald-400/80">
                    {selectedSurah.meaning} • {selectedSurah.totalVerses} Ayat
                  </p>
                </div>
                <span className="font-quran text-2xl text-amber-300">
                  {selectedSurah.arabicName}
                </span>
              </div>
            </div>

            {/* Quick choices list */}
            <p className="text-[11px] text-emerald-400/70 mb-2">Pilih Cepat Surah Lain:</p>
            <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {quickSurahs.map((num) => {
                const s = JUZ_30_SURAHS.find((item) => item.number === num);
                if (!s) return null;
                const isCurrent = s.number === selectedSurah.number;
                return (
                  <button
                    key={s.number}
                    onClick={() => {
                      playClick();
                      onSelectSurah(s);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold text-center border truncate transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onOpenSurahModal();
            }}
            className="mt-4 w-full py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-xs font-bold text-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Buka Semua 37 Surah Juz 30</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 2: Santri Yang Sedang Maju */}
        <div className="rounded-2xl bg-[#042414] border-2 border-emerald-700/80 p-5 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-emerald-800/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-emerald-100 uppercase tracking-wide">
                  Santri Yang Maju
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {students.length} Santri
              </span>
            </div>

            {/* Current Student Preview */}
            <div className="p-4 rounded-xl bg-[#02130a] border border-emerald-700/80 shadow-inner flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-3xl shadow">
                {currentStudent ? currentStudent.avatar : '👦'}
              </div>
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Giliran Maju Pertama:
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {currentStudent ? currentStudent.name : 'Pilih Santri'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-emerald-400/90 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {currentStudent?.stars || 0}
                  </span>
                  <span>•</span>
                  <span>{currentStudent?.score || 0} Poin</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-emerald-400/80 leading-relaxed">
              Guru dapat menambah nama anak murid kelas dan mengganti giliran maju berikutnya secara otomatis atau manual.
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              onOpenStudentModal();
            }}
            className="mt-4 w-full py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-xs font-bold text-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Kelola Daftar & Nilai Santri</span>
          </button>
        </div>

        {/* Column 3: Cara Kerja Proyektor & Fitur */}
        <div className="rounded-2xl bg-[#042414] border-2 border-emerald-700/80 p-5 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-emerald-800/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-emerald-100 uppercase tracking-wide">
                  Panduan Proyektor
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Transcreen
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-emerald-300/90">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  1
                </span>
                <p>Hubungkan HP ke proyektor mini via Transcreen / Screen Cast.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  2
                </span>
                <p>Anak maju ke depan layar, melihat potongan ayat, lalu membaca sambungannya secara lisan.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  3
                </span>
                <p>Guru membuka kunci sambungan ayat dan memberi nilai: Mumtaz, Jayyid, atau Muraja&apos;ah.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Screen Ready</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Audio Fanfare</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Tombol Mulai Kuis */}
      <div className="relative z-10 max-w-xl mx-auto w-full text-center pb-4 sm:pb-6">
        <button
          onClick={() => {
            playClick();
            onStartQuiz();
          }}
          className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-black text-xl sm:text-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)] border-2 border-amber-300/80 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3.5 group mx-auto cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-slate-950 text-slate-950 ml-0.5" />
          </div>
          <span>MULAI KUIS TAHFIDZ</span>
          <Sparkles className="w-6 h-6 text-slate-950 animate-pulse" />
        </button>

        <p className="text-xs text-emerald-400/70 mt-3 font-medium">
          Tekan tombol di atas untuk memulai kuis sambung ayat surah {selectedSurah.name}
        </p>
      </div>
    </div>
  );
};
