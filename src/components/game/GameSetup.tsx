import AddTeamForm from '../forms/AddTeamForm';
import MainContainer from '../MainContainer';
import Title from '../texts/Title';

export default function GameSetup() {
    return (
        <MainContainer className='flex items-center'>
            <div className='w-full max-w-2xl mx-auto space-y-10'>
                <Title>Nouvelle partie</Title>
                <div className='space-y-4'>
                    <h2 className='text-4xl text-white font-bold'>Équipes</h2>
                    <AddTeamForm />
                </div>
            </div>
        </MainContainer>
    );
}
