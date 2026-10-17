import React from 'react';
import { ScoreGrade, Student } from '../types/quiz';
import { Sparkles, Star, ThumbsUp, RefreshCw } from 'lucide-react';

interface CelebrationToastProps {
  grade: ScoreGrade | null;
  student: Student | null;
  onDismiss: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({
  grade,
  student,
  onDismiss,
}) => {
  if (!grade) return null;

  const configs = {
    mumtaz: {
      title: '🌟 MUMTAZ! (LANCAR SEKALI)',
      subtitle: 'Maa Syaa Allah Tabarakallah, bacaan sangat fasih & mutqin!',
      points: '+100 Poin',
      stars: 3,
      bg: 'bg-emerald-900/95 border-amber-400 text-amber-200',
      icon: <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />,
    },
    jayyid: {
      title: '👍 JAYYID! (BAGUS SEKALI)',
      subtitle: 'Alhamdulillah, sambungan ayat dibaca dengan baik!',
      points: '+75 Poin',
      stars: 2,
      bg: 'bg-teal-900/95 border-teal-400 text-teal-200',
      icon: <ThumbsUp className="w-8 h-8 text-teal-300" />,
    },
    murajaah: {
      title: '💪 MURAJA\'AH (SEMANGAT!)',
      subtitle: 'Hebat sudah berani mencoba! Ayo diulang sekali lagi!',
      points: '+50 Poin',
      stars: 1,
      bg: 'bg-amber-950/95 border-amber-500 text-amber-200',
      icon: <RefreshCw className="w-8 h-8 text-amber-400" />,
    },
  };

  const current = configs[grade];

  return (
    <div
      onClick={onDismiss}
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 cursor-pointer animate-in fade-in slide-in-from-top-6 duration-300"
    >
      <div
        className={`rounded-2xl border-2 p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-between gap-3 ${current.bg}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-black/40 border border-white/20 shrink-0">
            {current.icon}
          </div>
          <div>
            <h4 className="font-black text-base sm:text-lg text-white flex items-center gap-1.5">
              <span>{current.title}</span>
            </h4>
            <p className="text-xs text-white/90">{current.subtitle}</p>
            {student && (
              <p className="text-[11px] text-amber-300 font-bold mt-0.5">
                Santri: {student.name} • {current.points}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {Array.from({ length: current.stars }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 animate-bounce" />
          ))}
        </div>
      </div>
    </div>
  );
};
