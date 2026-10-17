import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Surah, QuizQuestion, Student, ScoreGrade } from './types/quiz';
import { JUZ_30_SURAHS } from './data/juz30Surahs';
import { getQuestionsBySurah, DEFAULT_STUDENTS } from './data/quizQuestions';
import { StartScreen } from './components/StartScreen';
import { HeaderNav } from './components/HeaderNav';
import { QuestionCard } from './components/QuestionCard';
import { TeacherControls } from './components/TeacherControls';
import { SurahModal } from './components/SurahModal';
import { StudentModal } from './components/StudentModal';
import { CelebrationToast } from './components/CelebrationToast';
import {
  setSoundEnabled,
  isSoundEnabled,
  playMumtazFanfare,
  playJayyidSound,
  playMurajaahSound,
  playReveal,
} from './utils/audio';
import { triggerMumtazConfetti, triggerStarBurst } from './utils/confetti';

export default function App() {
  // Screen state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Selected Surah
  const [selectedSurah, setSelectedSurah] = useState<Surah>(() => {
    return JUZ_30_SURAHS[0]; // Surah 78 An-Naba' by default
  });

  // Questions for the current surah (5 stocked questions with varying difficulty)
  const currentQuestions = useMemo(() => {
    return getQuestionsBySurah(selectedSurah.number);
  }, [selectedSurah.number]);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  // Students list
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('tahfidz_students');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_STUDENTS;
  });

  const [currentStudentIndex, setCurrentStudentIndex] = useState<number>(0);

  // Modals
  const [isSurahModalOpen, setIsSurahModalOpen] = useState<boolean>(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);

  // Display configurations
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Celebration toast
  const [celebrationGrade, setCelebrationGrade] = useState<ScoreGrade | null>(null);

  // Current active question
  const currentQuestion = currentQuestions[questionIndex] || currentQuestions[0];
  const currentStudent = students[currentStudentIndex] || students[0] || null;

  // Persist students
  useEffect(() => {
    try {
      localStorage.setItem('tahfidz_students', JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Handle Surah Change
  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    setQuestionIndex(0);
    setIsAnswerRevealed(false);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Sound toggle
  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
  };

  // Reveal Answer
  const handleRevealAnswer = useCallback(() => {
    setIsAnswerRevealed(true);
  }, []);

  // Next Question
  const handleNextQuestion = useCallback(() => {
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setIsAnswerRevealed(false);
    }
  }, [questionIndex, currentQuestions.length]);

  // Prev Question
  const handlePrevQuestion = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setIsAnswerRevealed(false);
    }
  }, [questionIndex]);

  // Random Question
  const handleRandomQuestion = useCallback(() => {
    if (currentQuestions.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * currentQuestions.length);
    if (nextIdx === questionIndex) {
      nextIdx = (nextIdx + 1) % currentQuestions.length;
    }
    setQuestionIndex(nextIdx);
    setIsAnswerRevealed(false);
  }, [currentQuestions.length, questionIndex]);

  // Next Student in Queue
  const handleNextStudent = useCallback(() => {
    if (students.length === 0) return;
    setCurrentStudentIndex((prev) => (prev + 1) % students.length);
  }, [students.length]);

  // Grade Student
  const handleGradeStudent = useCallback(
    (grade: ScoreGrade) => {
      // Auto reveal answer if not yet revealed
      if (!isAnswerRevealed) {
        setIsAnswerRevealed(true);
      }

      // Points and stars config
      const points = grade === 'mumtaz' ? 100 : grade === 'jayyid' ? 75 : 50;
      const stars = grade === 'mumtaz' ? 3 : grade === 'jayyid' ? 2 : 1;

      // Audio & Visual celebratory feedback
      if (grade === 'mumtaz') {
        playMumtazFanfare();
        triggerMumtazConfetti();
      } else if (grade === 'jayyid') {
        playJayyidSound();
        triggerStarBurst();
      } else {
        playMurajaahSound();
      }

      // Update student record
      if (currentStudent) {
        setStudents((prev) =>
          prev.map((s) => {
            if (s.id === currentStudent.id) {
              return {
                ...s,
                score: s.score + points,
                stars: s.stars + stars,
                totalQuestions: s.totalQuestions + 1,
                mumtazCount: grade === 'mumtaz' ? s.mumtazCount + 1 : s.mumtazCount,
                jayyidCount: grade === 'jayyid' ? s.jayyidCount + 1 : s.jayyidCount,
                murajaahCount: grade === 'murajaah' ? s.murajaahCount + 1 : s.murajaahCount,
              };
            }
            return s;
          })
        );
      }

      // Show toast
      setCelebrationGrade(grade);
    },
    [isAnswerRevealed, currentStudent]
  );

  // Auto dismiss toast
  useEffect(() => {
    if (!celebrationGrade) return;
    const timer = setTimeout(() => {
      setCelebrationGrade(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [celebrationGrade]);

  // Add Student
  const handleAddStudent = (name: string, avatar: string) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name,
      avatar,
      score: 0,
      stars: 0,
      totalQuestions: 0,
      mumtazCount: 0,
      jayyidCount: 0,
      murajaahCount: 0,
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  // Delete Student
  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setCurrentStudentIndex(0);
  };

  // Reset Scores
  const handleResetScores = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: 0,
        stars: 0,
        totalQuestions: 0,
        mumtazCount: 0,
        jayyidCount: 0,
        murajaahCount: 0,
      }))
    );
  };

  // Keyboard Shortcuts for Guru operating with wireless clicker or keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isPlaying) {
          setIsPlaying(true);
        } else if (!isAnswerRevealed) {
          playReveal();
          handleRevealAnswer();
        }
      } else if (isPlaying) {
        if (e.key === '1') {
          handleGradeStudent('mumtaz');
        } else if (e.key === '2') {
          handleGradeStudent('jayyid');
        } else if (e.key === '3') {
          handleGradeStudent('murajaah');
        } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
          handleNextQuestion();
        } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
          handlePrevQuestion();
        } else if (e.key === 'f' || e.key === 'F') {
          toggleFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPlaying,
    isAnswerRevealed,
    handleRevealAnswer,
    handleGradeStudent,
    handleNextQuestion,
    handlePrevQuestion,
  ]);

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Toast Notification */}
      <CelebrationToast
        grade={celebrationGrade}
        student={currentStudent}
        onDismiss={() => setCelebrationGrade(null)}
      />

      {!isPlaying ? (
        /* Title Screen / Start Screen */
        <StartScreen
          selectedSurah={selectedSurah}
          onOpenSurahModal={() => setIsSurahModalOpen(true)}
          onSelectSurah={handleSelectSurah}
          students={students}
          currentStudent={currentStudent}
          onOpenStudentModal={() => setIsStudentModalOpen(true)}
          onStartQuiz={() => setIsPlaying(true)}
          onToggleFullscreen={toggleFullscreen}
        />
      ) : (
        /* Main Arena - Optimized for HP Screen Casting to Projector */
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Bar with Surah Selector & Utilities */}
          <HeaderNav
            currentSurah={selectedSurah}
            onOpenSurahModal={() => setIsSurahModalOpen(true)}
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
            fontSizeScale={fontSizeScale}
            onChangeFontSize={setFontSizeScale}
            soundEnabled={soundActive}
            onToggleSound={toggleSound}
            onReturnHome={() => setIsPlaying(false)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />

          {/* Central Playfield Area (Questions & Answer Reveal) */}
          <main className="flex-1 flex items-center justify-center p-3 sm:p-6 my-2">
            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                questionNumber={questionIndex + 1}
                totalQuestions={currentQuestions.length}
                isAnswerRevealed={isAnswerRevealed}
                onRevealAnswer={handleRevealAnswer}
                currentStudent={currentStudent}
                fontSizeScale={fontSizeScale}
              />
            ) : (
              <div className="text-center p-8 bg-[#042013] rounded-2xl border border-emerald-700">
                <p className="text-lg text-emerald-200">Tidak ada soal untuk surah ini.</p>
              </div>
            )}
          </main>

          {/* Bottom Bar: HP Teacher Controls */}
          <footer className="p-3 sm:p-5 bg-[#020e07]/90 border-t border-emerald-900/80 sticky bottom-0 z-30 backdrop-blur-md">
            <TeacherControls
              currentIndex={questionIndex}
              totalQuestions={currentQuestions.length}
              isAnswerRevealed={isAnswerRevealed}
              onRevealAnswer={handleRevealAnswer}
              onGradeStudent={handleGradeStudent}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onRandomQuestion={handleRandomQuestion}
              onNextStudent={handleNextStudent}
              onOpenStudentModal={() => setIsStudentModalOpen(true)}
              onSelectLevelIndex={(idx) => {
                setQuestionIndex(idx);
                setIsAnswerRevealed(false);
              }}
              currentStudent={currentStudent}
            />
          </footer>
        </div>
      )}

      {/* Surah Selection Modal (all 37 Surahs of Juz 30) */}
      <SurahModal
        isOpen={isSurahModalOpen}
        onClose={() => setIsSurahModalOpen(false)}
        selectedSurahNumber={selectedSurah.number}
        onSelectSurah={handleSelectSurah}
      />

      {/* Student Queue & Scoreboard Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        students={students}
        currentStudentId={currentStudent?.id || null}
        onSelectStudent={(s) => {
          const idx = students.findIndex((item) => item.id === s.id);
          if (idx !== -1) setCurrentStudentIndex(idx);
        }}
        onAddStudent={handleAddStudent}
        onDeleteStudent={handleDeleteStudent}
        onResetScores={handleResetScores}
      />
    </div>
  );
}
