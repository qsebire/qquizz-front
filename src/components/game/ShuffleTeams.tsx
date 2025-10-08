'use client';

import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import { shuffleArray } from '../../../utils/hooks';
import { useGameStore } from '../../../stores';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import Team from './elements/Team';

export default function ShuffleTeams() {
    const { teams, setTeams } = useGameStore();

    const [orderedTeams, setOrderedTeams] = useState(teams);

    // useEffect(() => {
    //     if (!isThemeSelectionQuestion) {
    //         const goToWaitingAnswer = setTimeout(
    //             () => updateQuestionStep('waitingAnswer'),
    //             timePerQuestion
    //         );

    //         return () => {
    //             clearTimeout(goToWaitingAnswer);
    //         };
    //     }
    // }, [isThemeSelectionQuestion, timePerQuestion]);

    const teamList = orderedTeams.map((team) => {
        return (
            <Team
                team={team}
                key={team.id}
                size='lg'
            />
        );
    });

    // const shuffleTeams = shuffleArray(teams);
    // const shuffleTeamsList = shuffleTeams.map((team) => {
    //     return (
    //         <Team
    //             team={team}
    //             key={team.id}
    //             size='lg'
    //         />
    //     );
    // });

    return (
        <MainContainer className='flex flex-col items-center justify-between p-6 relative overflow-visible'>
            <Title className='text-left text-8xl'>Ordre de sélection</Title>
            <div className='w-full h-26 flex overflow-hidden border border-white relative'>
                {teams.map((teamNbr, id) => {
                    const nbTeams = teams.length;
                    const postion = (id / (nbTeams - 1)) * 100;
                    return (
                        <div
                            key={teamNbr.id}
                            className='flex flex-col gap-6 py-3 absolute infinite-scroll'
                            style={{
                                top: `-${nbTeams * 100}px`,
                                left: `${postion}%`,
                                transform: `translateX(-${postion}%)`,
                            }}
                        >
                            {teamList}
                            {teamList}
                        </div>
                    );
                })}
            </div>
            <Button label='Commencer la partie' />
        </MainContainer>
    );
}
