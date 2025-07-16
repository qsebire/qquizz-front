import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    TGameRules,
    TGameStep,
    TQuestionStep,
    TRoundStep,
    TTeam,
} from '../types/game';
import { TQuestion, TTheme } from '../types/question';

export interface GameState {
    teams: TTeam[];
    gameRules: TGameRules;
    round: {
        nbr: number;
        step: TRoundStep;
        randomQuestion: TQuestion | undefined;
        theme: TTheme | undefined;
        questions: TQuestion[];
        currentQuestion: number;
    };
    askedQuestions: number[];
    gameStep: TGameStep;
    questionStep: TQuestionStep;
    // Actions
    setTeams: (teams: TTeam[]) => void;
    addTeam: (team: TTeam) => void;
    removeTeam: (teamId: string) => void;
    setRules: (gameRules: TGameRules) => void;
    startGame: () => void;
    nextRound: () => void;
    updateRoundStep: (newStep: TRoundStep) => void;
    updateRoundRandomQuestion: (question: TQuestion) => void;
    updateRoundTheme: (theme: TTheme) => void;
    updateScores: (teams: TTeam[]) => void;
    addAskedQuestion: (questionId: number) => void;
    resetGame: () => void;
}

const defaultGameRules: TGameRules = {
    maxRounds: 10,
    questionPerRound: 5,
    timePerQuestion: 60,
    allowedTypes: ['TEXT', 'IMAGE', 'EMOJI'],
    allowedDifficulties: [1, 2, 3],
    allowedAnswerModes: ['CASH', 'MCQ', 'EITHER_ONE', 'TRUE_FALSE'],
};

const defaultRound = {
    nbr: 1,
    step: 'show' as TRoundStep,
    randomQuestion: undefined,
    theme: undefined,
    questions: [],
    currentQuestion: 1,
};

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            teams: [],
            gameRules: defaultGameRules,
            round: defaultRound,
            askedQuestions: [],
            gameStep: 'setup',
            questionStep: 'info',

            // Actions
            setTeams: (teams) => set({ teams }),

            addTeam: (team: TTeam) =>
                set((state) => ({
                    teams: [...state.teams, team],
                })),

            removeTeam: (teamId) =>
                set((state) => ({
                    teams: state.teams.filter((team) => team.id !== teamId),
                })),

            setRules: (gameRules) => set({ gameRules }),

            startGame: () => set({ gameStep: 'party' }),

            showResults: () => set({ gameStep: 'result' }),

            nextRound: () =>
                set((state) => ({
                    round: { ...defaultRound, nbr: state.round.nbr + 1 },
                })),

            updateRoundStep: (newStep) =>
                set((state) => ({
                    round: { ...state.round, step: newStep },
                })),

            updateRoundRandomQuestion: (question) =>
                set((state) => ({
                    round: { ...state.round, randomQuestion: question },
                })),

            updateRoundTheme: (theme) =>
                set((state) => ({
                    round: { ...state.round, theme: theme },
                })),

            updateScores: (teams) => set({ teams }),

            addAskedQuestion: (questionId) =>
                set((state) => ({
                    askedQuestions: [...state.askedQuestions, questionId],
                })),

            resetGame: () =>
                set({
                    round: defaultRound,
                    askedQuestions: [],
                    gameStep: 'result',
                    gameRules: defaultGameRules,
                }),
        }),
        {
            name: 'quiz-game-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                teams: state.teams,
                gameRules: state.gameRules,
                round: state.round,
                askedQuestions: state.askedQuestions,
                gameStep: state.gameStep,
                questionStep: state.questionStep,
            }),
        }
    )
);
