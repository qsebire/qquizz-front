import {
    AllowedAnswerMode,
    DifficultyLevel,
    QuestionTypeValue,
} from './question';

export interface Team {
    id: string;
    name: string;
    score: number;
    color: string;
}

export interface GameRules {
    maxRounds: number;
    questionPerRound: number;
    timePerQuestion: number;
    allowedTypes: QuestionTypeValue[];
    allowedDifficulties: DifficultyLevel[];
    allowedAnswerModes: AllowedAnswerMode[];
}
