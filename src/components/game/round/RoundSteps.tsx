'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../../../stores';
import ShowRound from './ShowRound';
import QuestionSteps from '../question/QuestionSteps';
import { buildQuestionApiUrl } from '../../../../utils/buildQuestionApiUrl';

export default function RoundSteps() {
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

    // --- Avoid two fetch on mount
    const renderAfterCalled = useRef(false);

    // --- Fetch first random question
    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
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

        if (!renderAfterCalled.current) {
            fetchRandomQuestion();
        }

        renderAfterCalled.current = true;
    }, []);

    // --- Wait delay befor change display
    useEffect(() => {
        const goToRandomQuestionStep = setTimeout(
            () => setDelayDone(true),
            3000
        );

        return () => {
            clearTimeout(goToRandomQuestionStep);
        };
    }, []);

    // --- If fetch and delay ok, change the display
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
