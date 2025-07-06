import { questionTypes } from './shared/quizzModes';

export type ThemeProps = { id: number; name: string; smiley: string };

export type formDataQuestionType = {
    question: string;
    type: (typeof questionTypes)[number];
    themeId: number;
    difficulty: 1 | 2 | 3;
    mediaUrl?: string;
    emojis?: string;
    answerDetail?: string;
    userId?: string;
    answers: { text: string; isCorrect: boolean }[];
};
