'use client';

import { useGameStore } from '../../../../stores';

export default function RoundSteps() {
    const { questionStep } = useGameStore();

    switch (questionStep) {
        case 'info':
        // return <ShowRound roundNbr={currentRound} />;
        case 'question':
        // return <RoundSteps />
        case 'answer':
        // return <Results />
        case 'points':
        // return <Results />
    }
}
