import React, { useState } from 'react';
import { QuizQuestion, Student } from '../types/quiz';
import { Eye, EyeOff, Sparkles, Volume2, HelpCircle, User, Star } from 'lucide-react';
import { playReveal, playClick } from '../utils/audio';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  isAnswerRevealed: boolean;
  onRevealAnswer: () => void;
  currentStudent: Student | null;
  fontSizeScale: 'normal' | 'large' | 'xlarge';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  isAnswerRevealed,
  onRevealAnswer,
  currentStudent,
  fontSizeScale,
}) => {
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTeacherHint, setShowTeacherHint] = useState(false);

  // Responsive font sizes according to scale
  const arabicPromptSize =
    fontSizeScale === 'xlarge'
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[2.2]'
      : fontSizeScale === 'large'
      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[2.1]'
      : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[2]';

  const arabicAnswerSize =
    fontSizeScale === 'xlarge'
      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[2.2]'
      : fontSizeScale === 'large'
      ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[2.1]'
      : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[2]';

  // Difficulty badge colors
  const difficultyColors = {
    1: 'bg-emerald-900/90 text-emerald-300 border-emerald-600',
    2: 'bg-teal-900/90 text-teal-300 border-teal-600',
    3: 'bg-amber-900/90 text-amber-300 border-amber-600',
    4: 'bg-orange-900/90 text-orange-300 border-orange-600',
    5: 'bg-purple-900/90 text-purple-300 border-purple-500',
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Active Student Turn Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#042013] border border-emerald-700/70 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
            {currentStudent ? currentStudent.avatar : <User className="w-4 h-4 text-slate-950" />}
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Santri Yang Sedang Maju:
            </span>
            <span className="text-base sm:text-lg font-extrabold text-white">
              {currentStudent ? currentStudent.name : 'Semua Santri'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentStudent && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-emerald-800 text-amber-300 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{currentStudent.stars} Bintang</span>
              <span className="text-emerald-500">•</span>
              <span className="text-emerald-300">{currentStudent.score} Poin</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
              Soal {questionNumber} / {totalQuestions}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                difficultyColors[question.difficulty]
              }`}
            >
              {question.difficultyLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Box 1: Kolom Hijau Tua - Potongan Ayat Soal */}
      <div className="rounded-2xl bg-[#052816] border-2 border-emerald-600 shadow-[0_4px_25px_rgba(0,0,0,0.5)] p-5 sm:p-7 relative overflow-hidden transition-all">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-2 right-4 text-emerald-800/20 font-quran text-8xl select-none pointer-events-none">
          ﷽
        </div>

        <div className="flex items-center justify-between gap-2 mb-4 border-b border-emerald-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-200">
              1. Potongan Ayat (Bacaan Awal)
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-800 font-medium">
              {question.promptAyahNumber}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              setShowTransliteration((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-xs text-emerald-300 transition-colors"
          >
            {showTransliteration ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTransliteration ? 'Sembunyikan Latin' : 'Tampilkan Latin'}</span>
          </button>
        </div>

        {/* Arabic Question Text (Extra Large for Mini Projector) */}
        <div className="py-2 text-center" dir="rtl">
          <p
            className={`font-quran text-amber-200 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)] ${arabicPromptSize} tracking-wide`}
          >
            {question.promptAyah}
          </p>
        </div>

        {/* Transliteration & Meaning */}
        {showTransliteration && (
          <div className="mt-4 pt-3 border-t border-emerald-700/40 text-center space-y-1 bg-black/25 rounded-xl p-3">
            <p className="text-xs sm:text-sm font-semibold text-emerald-300 italic tracking-wide">
              &quot;{question.promptTransliteration}&quot;
            </p>
            {question.promptMeaning && (
              <p className="text-xs text-emerald-400/80">
                Artinya: {question.promptMeaning}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Box 2: Kolom Hijau Tua - Sambungan Ayat (Target Jawaban Lisan Santri) */}
      <div
        className={`rounded-2xl border-2 transition-all p-5 sm:p-7 relative overflow-hidden ${
          isAnswerRevealed
            ? 'bg-[#06331c] border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.25)]'
            : 'bg-[#031d10] border-emerald-700/70 border-dashed shadow-inner'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-3 border-b border-emerald-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isAnswerRevealed ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'
              }`}
            ></span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-200">
              2. Sambungan Ayat Yang Harus Dibaca Anak:
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-800 font-medium">
              {question.answerAyahNumber}
            </span>
          </div>

          {/* Teacher Hint Toggle */}
          <button
            onClick={() => {
              playClick();
              setShowTeacherHint((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-[11px] text-amber-400/90 font-medium transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{showTeacherHint ? 'Tutup Clue Guru' : 'Bocoran Guru'}</span>
          </button>
        </div>

        {/* Teacher Clue Accordion (visible only if requested) */}
        {showTeacherHint && question.tajweedClue && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200/90 flex items-start gap-2 animate-in fade-in">
            <span className="font-bold text-amber-400 shrink-0">💡 Clue Tajweed:</span>
            <span>{question.tajweedClue}</span>
          </div>
        )}

        {/* Content State: Hidden vs Revealed */}
        {!isAnswerRevealed ? (
          <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-900/50 border border-emerald-600/60 flex items-center justify-center text-3xl mb-3 shadow-inner">
              🎙️
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-100 mb-1">
              Giliran Santri Membaca Sambungan Ayatnya Secara Lisan!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-400/80 max-w-md mb-5">
              Dengarkan lantunan ayat santri di depan proyektor. Setelah selesai, buka kunci jawaban di bawah untuk mencocokkan.
            </p>

            <button
              onClick={() => {
                playReveal();
                onRevealAnswer();
              }}
              className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>BUKA KUNCI SAMBUNGAN AYAT</span>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {/* Arabic Answer Text */}
            <div className="py-3 text-center" dir="rtl">
              <p
                className={`font-quran text-emerald-200 drop-shadow-[0_2px_15px_rgba(52,211,153,0.3)] ${arabicAnswerSize} tracking-wide`}
              >
                {question.answerAyah}
              </p>
            </div>

            {/* Answer Transliteration & Tajweed Note */}
            <div className="mt-4 pt-3 border-t border-emerald-700/40 text-center space-y-1.5 bg-black/30 rounded-xl p-3.5">
              <p className="text-xs sm:text-sm font-bold text-amber-300 italic tracking-wide">
                &quot;{question.answerTransliteration}&quot;
              </p>
              {question.answerMeaning && (
                <p className="text-xs text-emerald-300/80">
                  Artinya: {question.answerMeaning}
                </p>
              )}
              {question.tajweedClue && (
                <div className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-[11px] text-emerald-300 font-medium">
                  📖 {question.tajweedClue}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
