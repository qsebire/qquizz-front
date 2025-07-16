'use client';

import { X } from 'lucide-react';
import { useGameStore } from '../../../stores';
import AddTeamForm from '../forms/AddTeamForm';
import MainContainer from '../MainContainer';
import Title from '../texts/Title';
import Team from './elements/Team';
import { colorTeam } from '../../../data/shared/quizzModes';
import GameRulesForm from '../forms/GameRulesForm';
import { useHydrated } from '../../../utils/useHydrated';
import Button from '../Button';

function TeamList() {
    const { teams, removeTeam } = useGameStore();

    return teams.map((team) => {
        return (
            <div
                key={team.id}
                className='flex items-center gap-1'
            >
                <Team team={team} />
                <X
                    size={28}
                    className='stroke-white stroke-3 cursor-pointer'
                    onClick={() => removeTeam(team.id)}
                />
            </div>
        );
    });
}

export default function GameSetup() {
    const { teams, startGame } = useGameStore();

    const isHydrated = useHydrated();

    return (
        <MainContainer className='space-y-8 relative'>
            <Title>Nouvelle partie</Title>
            {isHydrated && (
                <div className='w-full grid grid-cols-[1fr_1px_1fr] gap-12'>
                    <div className='space-y-4 w-full'>
                        <h2 className='text-4xl text-white font-bold'>
                            Règles de la partie
                        </h2>
                        <GameRulesForm />
                    </div>
                    <div className='h-full w-1 bg-white rounded-full shrink-0' />
                    <div className='space-y-4 w-full'>
                        <h2 className='text-4xl text-white font-bold'>
                            Équipes
                        </h2>
                        {teams.length < colorTeam.length && <AddTeamForm />}
                        <div className='space-y-2 flex flex-wrap gap-4'>
                            <TeamList />
                        </div>
                    </div>
                </div>
            )}
            {teams.length >= 2 && (
                <Button
                    label='Lancer la partie !'
                    className='ml-auto mr-0 animate-bounce absolute bottom-4 right-4 z-50'
                    size='3xl'
                    onClick={() => startGame()}
                />
            )}
        </MainContainer>
    );
}
