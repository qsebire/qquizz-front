'use client';

import { useGameStore } from '../../../stores';
import GameSetup from './GameSetup';
import RoundSteps from './round/RoundSteps';

export default function GameSteps() {
    const { gameStep } = useGameStore();

    switch (gameStep) {
        case 'setup':
            return <GameSetup />;
        case 'party':
            return <RoundSteps />;
        case 'result':
        // return <Results />
    }
}
