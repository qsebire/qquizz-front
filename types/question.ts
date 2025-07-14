import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from '../data/shared/quizzModes';

export interface Theme {
    id: number;
    name: string;
    smiley: string;
}

export interface SubTheme {
    id: number;
    name: string;
}

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export type QuestionTypeValue = (typeof questionTypes)[number]['value'];
export type DifficultyLevel = (typeof difficulties)[number]['level'];
export type AllowedAnswerMode = (typeof allowedAnswerModes)[number]['name'];

export interface Question {
    question: string;
    type: QuestionTypeValue;
    theme: { id: number; name: string; smiley: string };
    subTheme?: { id?: number; name: string };
    difficulty: DifficultyLevel;
    mediaUrl?: string;
    emojis?: string;
    allowedAnswerModes: AllowedAnswerMode[];
    answers: Answer[];
    answerDetail?: string;
    userId?: string;
}
