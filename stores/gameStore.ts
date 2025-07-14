import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { GameRules, Team } from '../types/game';

export interface GameState {
    teams: Team[];
    gameRules: GameRules;
    currentRound: number;
    askedQuestions: number[];
    isGameStarted: boolean;
    // Actions
    setTeams: (teams: Team[]) => void;
    addTeam: (team: Team) => void;
    removeTeam: (teamId: string) => void;
    setRules: (gameRules: GameRules) => void;
    startGame: () => void;
    nextRound: () => void;
    updateScores: (teams: Team[]) => void;
    addAskedQuestion: (questionId: number) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            teams: [],
            gameRules: {
                maxRounds: 10,
                questionPerRound: 5,
                timePerQuestion: 60,
                allowedTypes: ['TEXT', 'IMAGE', 'EMOJI'],
                allowedDifficulties: [1, 2, 3, 4],
                allowedAnswerModes: ['CASH', 'MCQ', 'EITHER_ONE', 'TRUE_FALSE'],
            },
            currentRound: 1,
            askedQuestions: [],
            isGameStarted: false,

            // Actions
            setTeams: (teams) => set({ teams }),

            addTeam: (team: Team) =>
                set((state) => ({
                    teams: [...state.teams, team],
                })),

            removeTeam: (teamId) =>
                set((state) => ({
                    teams: state.teams.filter((team) => team.id !== teamId),
                })),

            setRules: (gameRules) => set({ gameRules }),

            startGame: () => set({ isGameStarted: true }),

            nextRound: () =>
                set((state) => ({
                    currentRound: state.currentRound + 1,
                })),

            updateScores: (teams) => set({ teams }),

            addAskedQuestion: (questionId) =>
                set((state) => ({
                    askedQuestions: [...state.askedQuestions, questionId],
                })),

            resetGame: () =>
                set({
                    teams: [],
                    currentRound: 1,
                    askedQuestions: [],
                    isGameStarted: false,
                    // On garde les règles par défaut
                    gameRules: {
                        maxRounds: 10,
                        questionPerRound: 5,
                        timePerQuestion: 60,
                        allowedTypes: ['TEXT', 'IMAGE', 'EMOJI'],
                        allowedDifficulties: [1, 2, 3, 4],
                        allowedAnswerModes: [
                            'CASH',
                            'MCQ',
                            'EITHER_ONE',
                            'TRUE_FALSE',
                        ],
                    },
                }),
        }),
        {
            name: 'quiz-game-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                teams: state.teams,
                gameRules: state.gameRules,
                currentRound: state.currentRound,
                askedQuestions: state.askedQuestions,
                isGameStarted: state.isGameStarted,
            }),
        }
    )
);
