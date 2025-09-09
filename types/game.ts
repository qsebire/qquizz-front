import { THslArray } from '.';
import { TAnswerMode, TDifficultyLevel, TQuestionTypeValue } from './question';

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
    allowedAnswerModes: TAnswerMode[];
}

export type TGameStep = 'setup' | 'party' | 'result';
export type TRoundStep =
    | 'show'
    | 'randomQuestion'
    | 'selectTheme'
    | 'questions'
    | 'result';
export type TQuestionStep =
    | 'info'
    | 'question'
    | 'waitingAnswer'
    | 'answer'
    | 'points';
