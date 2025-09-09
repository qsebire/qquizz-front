'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '../../../../stores';
import ShowRound from './ShowRound';
import QuestionSteps from '../question/QuestionSteps';
import { buildQuestionApiUrl } from '../../../../utils/buildQuestionApiUrl';

export default function RoundSteps() {
    console.log('RoundSteps');

    const {
        round,
        askedQuestions,
        addRoundQuestion,
        addAskedQuestion,
        gameRules,
        updateRoundStep,
    } = useGameStore();

    const [isFetchDone, setIsFetchDone] = useState(false);
    const [isDelayDone, setDelayDone] = useState(false);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                if (round.questions.length >= 1 || isFetchDone) {
                    return;
                }

                const fetchUrl = buildQuestionApiUrl({
                    askedIds: askedQuestions,
                    answerModes: ['MCQ'],
                    difficulties: gameRules.allowedDifficulties,
                });
                const resp = await fetch(fetchUrl);

                const randomQuestion = await resp.json();

                if (!resp.ok) {
                    console.log(randomQuestion?.error || 'Erreur serveur.');
                    return;
                }
                setIsFetchDone(true);
                addRoundQuestion({
                    ...randomQuestion,
                    answerMode: 'MCQ',
                    questionGameMode: 'SPEED',
                });
                // addAskedQuestion(randomQuestion.id);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRandomQuestion();
    }, []);

    useEffect(() => {
        const goToRandomQuestionStep = setTimeout(
            () => setDelayDone(true),
            3000
        );

        return () => {
            clearTimeout(goToRandomQuestionStep);
        };
    }, []);

    useEffect(() => {
        if (isFetchDone && isDelayDone) {
            updateRoundStep('randomQuestion');
        }
    }, [isFetchDone, isDelayDone]);

    console.log(round);

    switch (round.step) {
        case 'show':
            return <ShowRound roundNbr={round.nbr} />;
        case 'randomQuestion':
            return <QuestionSteps />;
        case 'selectTheme':
        // return <Results />
        case 'questions':
        // return <Results />
        case 'result':
        // return <Results />
    }
}
