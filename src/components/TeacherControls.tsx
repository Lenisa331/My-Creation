import React from 'react';
import { ScoreGrade, Student } from '../types/quiz';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Users,
  CheckCircle,
  ThumbsUp,
  RefreshCw,
  Award,
} from 'lucide-react';
import { playClick } from '../utils/audio';

interface TeacherControlsProps {
  currentIndex: number;
  totalQuestions: number;
  isAnswerRevealed: boolean;
  onRevealAnswer: () => void;
  onGradeStudent: (grade: ScoreGrade) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onRandomQuestion: () => void;
  onNextStudent: () => void;
  onOpenStudentModal: () => void;
  onSelectLevelIndex: (index: number) => void;
  currentStudent: Student | null;
}

export const TeacherControls: React.FC<TeacherControlsProps> = ({
  currentIndex,
  totalQuestions,
  isAnswerRevealed,
  onRevealAnswer,
  onGradeStudent,
  onNextQuestion,
  onPrevQuestion,
  onRandomQuestion,
  onNextStudent,
  onOpenStudentModal,
  onSelectLevelIndex,
  currentStudent,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#041c10] border-2 border-emerald-700/80 p-4 sm:p-5 shadow-[0_4px_30px_rgba(0,0,0,0.7)] flex flex-col gap-4">
      {/* Top Controller Bar: Level Selector & Quick Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/60 pb-3">
        {/* Level pills 1 to 5 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold text-emerald-400 mr-1 hidden sm:inline">
            Pilih Soal:
          </span>
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  onSelectLevelIndex(idx);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                }`}
                title={`Level ${idx + 1}`}
              >
                L{idx + 1}
              </button>
            );
          })}
        </div>

        {/* Next Student & Queue Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              onNextStudent();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-xs font-bold text-emerald-200 transition-colors shadow-sm"
            title="Ganti ke anak berikutnya dalam antrian"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Anak Berikutnya ⏭️</span>
          </button>
          <button
            onClick={() => {
              playClick();
              onOpenStudentModal();
            }}
            className="p-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400"
            title="Kelola antrian santri"
          >
            <Award className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scoring Action Grid for Teacher on HP */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Grading Section */}
        <div className="w-full sm:flex-1 grid grid-cols-3 gap-2 sm:gap-3">
          {/* Mumtaz Button */}
          <button
            onClick={() => onGradeStudent('mumtaz')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 border border-emerald-400 text-white font-black shadow-lg shadow-emerald-950/50 transition-all active:scale-95 group"
          >
            <div className="flex items-center gap-1 text-sm sm:text-base font-extrabold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>MUMTAZ!</span>
            </div>
            <span className="text-[10px] sm:text-xs text-emerald-100/90 font-medium mt-0.5">
              Lancar (+100) ⭐⭐⭐
            </span>
          </button>

          {/* Jayyid Button */}
          <button
            onClick={() => onGradeStudent('jayyid')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 border border-teal-500 text-white font-black shadow-lg transition-all active:scale-95"
          >
            <div className="flex items-center gap-1 text-sm sm:text-base font-extrabold text-teal-200">
              <ThumbsUp className="w-4 h-4 text-teal-300" />
              <span>JAYYID</span>
            </div>
            <span className="text-[10px] sm:text-xs text-teal-200/90 font-medium mt-0.5">
              Bagus (+75) ⭐⭐
            </span>
          </button>

          {/* Muraja'ah Button */}
          <button
            onClick={() => onGradeStudent('murajaah')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 border border-amber-500 text-white font-black shadow-lg transition-all active:scale-95"
          >
            <div className="flex items-center gap-1 text-sm sm:text-base font-extrabold text-amber-200">
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>MURAJA&apos;AH</span>
            </div>
            <span className="text-[10px] sm:text-xs text-amber-200/90 font-medium mt-0.5">
              Ayo Ulangi (+50) ⭐
            </span>
          </button>
        </div>

        {/* Reveal Answer Button or Nav buttons */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
          {!isAnswerRevealed && (
            <button
              onClick={() => {
                playClick();
                onRevealAnswer();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Buka Sambungan</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playClick();
                onPrevQuestion();
              }}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 disabled:opacity-40 border border-emerald-800 text-emerald-200 transition-colors"
              title="Soal Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                playClick();
                onRandomQuestion();
              }}
              className="p-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-amber-400 transition-colors"
              title="Acak Soal"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                playClick();
                onNextQuestion();
              }}
              disabled={currentIndex === totalQuestions - 1}
              className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold transition-all shadow"
              title="Soal Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
