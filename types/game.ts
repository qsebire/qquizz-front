import { THslArray } from '.';
import {
    TAllowedAnswerMode,
    TDifficultyLevel,
    TQuestionTypeValue,
} from './question';

export interface TTeam {
    id: string;
    name: string;
    score: number;
    color: THslArray;
}

export interface TGameRules {
    maxRounds: number;
    questionPerRound: number;
    timePerQuestion: number;
    allowedTypes: TQuestionTypeValue[];
    allowedDifficulties: TDifficultyLevel[];
    allowedAnswerModes: TAllowedAnswerMode[];
}

export type TGameStep = 'setup' | 'party' | 'result';
export type TRoundStep =
    | 'show'
    | 'randomQuestion'
    | 'selectTheme'
    | 'questions'
    | 'result';
export type TQuestionStep = 'info' | 'question' | 'answer' | 'points';
