import MainContainer from '@/components/MainContainer';
import Title from '@/components/texts/Title';
import { useGameStore } from '../../../../stores';
import Team from '../elements/Team';
import Tag from '@/components/Tag';

export default function RoundSelectTeam() {
    const { round, teams } = useGameStore();
    const { nbr } = round;

    const selectedTeamId = (nbr - 1) % teams.length;

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
