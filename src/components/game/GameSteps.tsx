'use client';

import { useGameStore } from '../../../stores';
import { useHydrated } from '../../../utils/useHydrated';
import GameSetup from './GameSetup';
import RoundSteps from './round/RoundSteps';

export default function GameSteps() {
    console.log('GameSteps');
    const { gameStep } = useGameStore();
    const isHydrated = useHydrated();

    if (!isHydrated) return;

    switch (gameStep) {
        case 'setup':
            return <GameSetup />;
        case 'party':
            return <RoundSteps />;
        case 'result':
        // return <Results />
    }
}
