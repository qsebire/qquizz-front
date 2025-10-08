'use client';

import { useGameStore } from '../../../stores';
import { useHydrated } from '../../../utils/useHydrated';
import GameSetup from './GameSetup';
import RoundSteps from './round/RoundSteps';
import ShuffleTeams from './ShuffleTeams';

export default function GameSteps() {
    const { gameStep } = useGameStore();
    const isHydrated = useHydrated();

    if (!isHydrated) return;

    switch (gameStep) {
        case 'setup':
            return <GameSetup />;
        case 'shuffleTeams':
            return <ShuffleTeams />;
        case 'party':
            return <RoundSteps />;
        case 'result':
        // return <Results />
    }
}
