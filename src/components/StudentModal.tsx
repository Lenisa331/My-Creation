import React, { useState } from 'react';
import { Student } from '../types/quiz';
import { X, UserPlus, Star, Award, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { playClick } from '../utils/audio';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  currentStudentId: string | null;
  onSelectStudent: (student: Student) => void;
  onAddStudent: (name: string, avatar: string) => void;
  onDeleteStudent: (id: string) => void;
  onResetScores: () => void;
}

const AVATAR_OPTIONS = ['👦', '👧', '🌟', '👑', '🦁', '🚀', '🎨', '📚'];

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  students,
  currentStudentId,
  onSelectStudent,
  onAddStudent,
  onDeleteStudent,
  onResetScores,
}) => {
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👦');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    playClick();
    onAddStudent(newName.trim(), selectedAvatar);
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#03150c] border-2 border-emerald-700/80 shadow-[0_0_50px_rgba(5,150,105,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-800/60 bg-[#052314]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-100 flex items-center gap-2">
                Daftar Santri & Antrian Maju
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-300 font-medium">
                  {students.length} Anak
                </span>
              </h2>
              <p className="text-xs text-emerald-400/80">
                Pilih santri yang sedang maju ke depan proyektor atau tambahkan nama santri baru
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Student Form */}
        <form onSubmit={handleAdd} className="p-4 border-b border-emerald-900/60 bg-[#041c10] flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {AVATAR_OPTIONS.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => setSelectedAvatar(av)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border transition-all ${
                  selectedAvatar === av
                    ? 'bg-amber-500/30 border-amber-400 scale-105'
                    : 'bg-emerald-950/50 border-emerald-800 hover:bg-emerald-900'
                }`}
              >
                {av}
              </button>
            ))}
          </div>

          <div className="flex flex-1 w-full gap-2">
            <input
              type="text"
              placeholder="Ketik nama santri (contoh: Zaid, Aisyah)..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-[#031008] border border-emerald-700/60 text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-400 text-sm"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>
        </form>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {students.map((student, idx) => {
            const isCurrent = student.id === currentStudentId;
            return (
              <div
                key={student.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-800/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400'
                    : 'bg-[#052615] border-emerald-800/80 hover:bg-[#07361e]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-xs font-bold w-5 text-emerald-500">#{idx + 1}</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-xl shadow">
                    {student.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-100 text-base">{student.name}</h4>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold uppercase tracking-wider">
                          Sedang Maju
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-emerald-400/90">
                      <span className="flex items-center gap-1 font-semibold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {student.stars} Bintang
                      </span>
                      <span>•</span>
                      <span className="text-emerald-300 font-semibold">{student.score} Poin</span>
                      <span>•</span>
                      <span className="text-emerald-400/80">
                        Mumtaz: {student.mumtazCount} | Jayyid: {student.jayyidCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playClick();
                      onSelectStudent(student);
                      onClose();
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isCurrent ? 'Giliran Aktif' : 'Pilih Maju'}
                  </button>

                  {students.length > 1 && (
                    <button
                      onClick={() => {
                        playClick();
                        onDeleteStudent(student.id);
                      }}
                      className="p-1.5 rounded-lg text-emerald-600 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                      title="Hapus santri"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Reset */}
        <div className="px-5 py-3 border-t border-emerald-900/60 bg-[#020e07] flex items-center justify-between text-xs">
          <span className="text-emerald-400/70">
            Guru dapat mengganti anak giliran maju berikutnya secara otomatis atau manual.
          </span>
          <button
            onClick={() => {
              if (window.confirm('Reset semua perolehan bintang dan poin santri?')) {
                playClick();
                onResetScores();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Skor
          </button>
        </div>
      </div>
    </div>
  );
};
