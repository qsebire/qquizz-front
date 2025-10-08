'use client';

import MainContainer from '@/components/MainContainer';
import Title from '@/components/texts/Title';
import { useGameStore } from '../../../../stores';
import Team from '../elements/Team';
import Tag from '@/components/Tag';
import { useEffect } from 'react';

export default function RoundSelectTheme() {
    const { round, teams, chosenThemes } = useGameStore();
    const { nbr } = round;
    const selectedTeamId = (nbr - 1) % teams.length;

    // useEffect(() => {
    //     const fetchThemes = async () => {
    //         try {
    //             const baseUrl = new URL(
    //                 '/theme',
    //                 process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    //             );
    //             baseUrl.searchParams.append("excludedThemesId", chosenThemes.join(','));
    //             baseUrl.searchParams.append("nbr", "3");
    //         }
    //     }
    // })

    // --- Fetch first random question
    // useEffect(() => {
    //     const fetchRandomQuestion = async () => {
    //         try {
    //             const fetchUrl = buildQuestionApiUrl({
    //                 askedIds: askedQuestions,
    //                 answerModes: ['MCQ'],
    //                 difficulties: gameRules.allowedDifficulties,
    //             });
    //             const resp = await fetch(fetchUrl);

    //             const randomQuestion = await resp.json();

    //             if (!resp.ok) {
    //                 console.log(randomQuestion?.error || 'Erreur serveur.');
    //                 return;
    //             }
    //             setIsFetchDone(true);
    //             addRoundQuestion({
    //                 ...randomQuestion,
    //                 answerMode: 'MCQ',
    //                 questionGameMode: 'SPEED',
    //             });
    //             // addAskedQuestion(randomQuestion.id);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     if (!renderAfterCalled.current) {
    //         fetchRandomQuestion();
    //     }

    //     renderAfterCalled.current = true;
    // }, []);

    return (
        <MainContainer className='flex justify-center items-center relative overflow-visible'>
            <Tag
                label={`Tour n°${nbr}`}
                size='xl'
                className='absolute -top-7'
            />
            <div className='flex flex-col items-center gap-8'>
                <Team
                    team={teams[selectedTeamId]}
                    size='lg'
                />
                <Title className='text-6xl'>Choisi le premier thème</Title>
            </div>
        </MainContainer>
    );
}
