import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from '../data/shared/quizzModes';

export interface TTheme {
    id: number;
    name: string;
    smiley: string;
}

export interface TSubTheme {
    id: number;
    name: string;
}

export interface TAnswer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export type TQuestionTypeValue = (typeof questionTypes)[number]['value'];
export type TDifficultyLevel = (typeof difficulties)[number]['level'];
export type TAllowedAnswerMode = (typeof allowedAnswerModes)[number]['name'];

export interface TQuestion {
    question: string;
    type: TQuestionTypeValue;
    theme: { id: number; name: string; smiley: string };
    subTheme?: { id?: number; name: string };
    difficulty: TDifficultyLevel;
    mediaUrl?: string;
    emojis?: string;
    allowedAnswerModes: TAllowedAnswerMode[];
    answers: TAnswer[];
    answerDetail?: string;
    userId?: string;
}
