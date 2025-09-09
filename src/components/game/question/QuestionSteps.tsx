'use client';

import { useGameStore } from '../../../../stores';
import { TQuestion } from '../../../../types/question';
import Question from './Question';
import QuestionInfos from './QuestionInfos';

export default function QuestionSteps() {
    const { round } = useGameStore();

    switch (round.questionStep) {
        case 'info':
            return <QuestionInfos />;
        case 'question':
            return <Question />;
        case 'answer':
        // return <Results />
        case 'points':
        // return <Results />
    }
}
