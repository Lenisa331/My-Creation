export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  meaning: string;
  totalVerses: number;
  revelation: 'Makkiyah' | 'Madaniyah';
}

export interface QuizQuestion {
  id: string;
  surahNumber: number;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  promptAyah: string;
  promptAyahNumber: string;
  promptTransliteration: string;
  promptMeaning?: string;
  answerAyah: string;
  answerAyahNumber: string;
  answerTransliteration: string;
  answerMeaning?: string;
  tajweedClue?: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  score: number;
  stars: number;
  totalQuestions: number;
  mumtazCount: number;
  jayyidCount: number;
  murajaahCount: number;
}

export type ScoreGrade = 'mumtaz' | 'jayyid' | 'murajaah';

export interface ScoreHistoryItem {
  id: string;
  studentId: string;
  studentName: string;
  surahName: string;
  ayahInfo: string;
  grade: ScoreGrade;
  pointsAdded: number;
  timestamp: number;
}
