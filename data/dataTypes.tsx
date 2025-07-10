import {
    allowedAnswerModes,
    difficulties,
    questionTypes,
} from './shared/quizzModes';

export type ThemeProps = { id: number; name: string; smiley: string };

export type SubThemeProps = { id: number; name: string };

export type AnswerProps = { id: string; text: string; isCorrect: boolean };

export type allowedAnswerModeType = (typeof allowedAnswerModes)[number]['name'];

export type formDataQuestionType = {
    question: string;
    type: (typeof questionTypes)[number]['value'];
    themeId: number;
    subTheme?: { id?: number; name: string };
    difficulty: (typeof difficulties)[number]['level'];
    mediaUrl?: string;
    emojis?: string;
    allowedAnswerMode: allowedAnswerModeType[];
    answers: AnswerProps[];
    answerDetail?: string;
    userId?: string;
};
