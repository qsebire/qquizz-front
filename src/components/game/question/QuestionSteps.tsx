'use client';

import { useGameStore } from '../../../../stores';
import QuestionWaitingAnswer from './QuestinWaitingAnswer';
import Question from './Question';
import QuestionAnswer from './QuestionAnswer';
import QuestionInfos from './QuestionInfos';

export default function QuestionSteps() {
    const { round } = useGameStore();

    switch (round.questionStep) {
        case 'info':
            return <QuestionInfos />;
        case 'question':
            return <Question />;
        case 'waitingAnswer':
            return <QuestionWaitingAnswer />;
        case 'answer':
            return <QuestionAnswer />;
    }
}
