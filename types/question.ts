import {
    answerModes,
    questionGameModes,
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

export type TQuestionGameMode = (typeof questionGameModes)[number]['name'];
export type TQuestionTypeValue = (typeof questionTypes)[number]['value'];
export type TDifficultyLevel = (typeof difficulties)[number]['level'];
export type TAnswerMode = (typeof answerModes)[number]['name'];

export interface TQuestion {
    question: string;
    type: TQuestionTypeValue;
    theme: { id: number; name: string; smiley: string };
    subTheme?: { id?: number; name: string };
    difficulty: TDifficultyLevel;
    mediaUrl?: string;
    emojis?: string;
    allowedAnswerModes: TAnswerMode[];
    answers: TAnswer[];
    answerDetail?: string;
    userId?: string;
}

export type TPlayableQuestion = TQuestion & {
    answerMode: TAnswerMode;
    questionGameMode: TQuestionGameMode;
};
