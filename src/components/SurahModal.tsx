import React, { useState, useMemo } from 'react';
import { Surah } from '../types/quiz';
import { JUZ_30_SURAHS } from '../data/juz30Surahs';
import { Search, X, BookOpen, Sparkles, ArrowUpDown } from 'lucide-react';
import { playClick } from '../utils/audio';

interface SurahModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSurahNumber: number;
  onSelectSurah: (surah: Surah) => void;
}

export const SurahModal: React.FC<SurahModalProps> = ({
  isOpen,
  onClose,
  selectedSurahNumber,
  onSelectSurah,
}) => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'normal' | 'reverse'>('normal');

  const filteredSurahs = useMemo(() => {
    let list = [...JUZ_30_SURAHS];
    if (sortOrder === 'reverse') {
      list.reverse();
    }
    if (!search.trim()) return list;

    const term = search.toLowerCase();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.meaning.toLowerCase().includes(term) ||
        s.number.toString().includes(term) ||
        s.arabicName.includes(term)
    );
  }, [search, sortOrder]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#03150c] border-2 border-emerald-700/80 shadow-[0_0_50px_rgba(5,150,105,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-800/60 bg-[#052314]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-100 flex items-center gap-2">
                Pilih Surah Juz 30
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-300 font-medium">
                  37 Surah Lengkap
                </span>
              </h2>
              <p className="text-xs text-emerald-400/80">
                Pilih salah satu surah yang akan diujikan kepada anak
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 hover:text-white transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-emerald-900/60 bg-[#041c10] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/70" />
            <input
              type="text"
              placeholder="Cari surah... (misal: An-Naba, Al-Ikhlas, 114)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#031008] border border-emerald-700/60 text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-400 text-sm"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white px-1.5 py-0.5 rounded bg-emerald-900"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                playClick();
                setSortOrder((prev) => (prev === 'normal' ? 'reverse' : 'normal'));
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-700/60 text-xs font-semibold text-emerald-200 hover:bg-emerald-900 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
              {sortOrder === 'normal' ? 'Urut: An-Naba → An-Nas' : 'Urut: An-Nas → An-Naba'}
            </button>
          </div>
        </div>

        {/* Surah Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredSurahs.map((surah) => {
            const isSelected = surah.number === selectedSurahNumber;
            return (
              <button
                key={surah.number}
                onClick={() => {
                  playClick();
                  onSelectSurah(surah);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-700/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400'
                    : 'bg-[#052615] border-emerald-800/80 hover:bg-[#07361e] hover:border-emerald-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                    }`}
                  >
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                      {surah.name}
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />}
                    </h3>
                    <p className="text-xs text-emerald-400/80">
                      {surah.meaning} • {surah.totalVerses} Ayat
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-quran text-lg text-amber-300 block">
                    {surah.arabicName}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    5 Soal
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-emerald-900/60 bg-[#020e07] flex items-center justify-between text-xs text-emerald-400/80">
          <span>Menampilkan {filteredSurahs.length} dari 37 surah</span>
          <span className="text-amber-400 font-medium">Setiap surah memiliki 5 tingkatan soal (Level 1-5)</span>
        </div>
      </div>
    </div>
  );
};
