'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '../../../../stores';
import ShowRound from './ShowRound';
import { URL_BACKEND } from '../../../../data/general';
import RandomQuestion from '../question/RandomQuestion';

export default function RoundSteps() {
    const {
        round,
        askedQuestions,
        updateRoundRandomQuestion,
        addAskedQuestion,
        updateRoundStep,
    } = useGameStore();

    const [isFetchDone, setIsFetchDone] = useState(false);
    const [isDelayDone, setDelayDone] = useState(false);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                const askedIdsString = askedQuestions.join(',');
                const resp = await fetch(
                    `${URL_BACKEND}/question/random${
                        askedIdsString && `?askedIds=${askedIdsString}`
                    }`
                );
                const randomQuestion = await resp.json();

                if (!resp.ok) {
                    console.log(randomQuestion?.error || 'Erreur serveur.');
                    return;
                }
                console.log(randomQuestion);
                updateRoundRandomQuestion(randomQuestion);
                setIsFetchDone(true);
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
    console.log(isFetchDone);
    console.log(isDelayDone);

    switch (round.step) {
        case 'show':
            return <ShowRound roundNbr={round.nbr} />;
        case 'randomQuestion':
            return <RandomQuestion />;
        case 'selectTheme':
        // return <Results />
        case 'questions':
        // return <Results />
        case 'result':
        // return <Results />
    }
}
