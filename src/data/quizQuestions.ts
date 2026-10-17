import { QuizQuestion, Student } from '../types/quiz';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QUESTIONS_PART_3 } from './questionsPart3';

export const ALL_QUESTIONS: QuizQuestion[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
];

export const getQuestionsBySurah = (surahNumber: number): QuizQuestion[] => {
  return ALL_QUESTIONS.filter((q) => q.surahNumber === surahNumber);
};

export const getQuestionById = (id: string): QuizQuestion | undefined => {
  return ALL_QUESTIONS.find((q) => q.id === id);
};

export const DEFAULT_STUDENTS: Student[] = [
  { id: 'std-1', name: 'Ahmad Fauzan', avatar: '👦', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
  { id: 'std-2', name: 'Aisyah Humaira', avatar: '👧', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
  { id: 'std-3', name: 'Zaid bin Tsabit', avatar: '👦', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
  { id: 'std-4', name: 'Fatimah Az-Zahra', avatar: '👧', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
  { id: 'std-5', name: 'Umar Al-Faruq', avatar: '👦', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
  { id: 'std-6', name: 'Maryam As-Salma', avatar: '👧', score: 0, stars: 0, totalQuestions: 0, mumtazCount: 0, jayyidCount: 0, murajaahCount: 0 },
];
