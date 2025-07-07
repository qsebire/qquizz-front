import { difficulties, questionTypes } from './shared/quizzModes';

export type ThemeProps = { id: number; name: string; smiley: string };

export type AnswerProps = { id: string; text: string; isCorrect: boolean };

export type formDataQuestionType = {
    question: string;
    type: (typeof questionTypes)[number]['value'];
    themeId: number;
    difficulty: (typeof difficulties)[number]['level'];
    mediaUrl?: string;
    emojis?: string;
    answerDetail?: string;
    userId?: string;
    answers: AnswerProps[];
};
