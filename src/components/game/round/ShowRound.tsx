import MainContainer from '@/components/MainContainer';
import Title from '@/components/texts/Title';

export default function ShowRound({ roundNbr }: { roundNbr: number }) {
    return (
        <MainContainer className='flex justify-center items-center'>
            <Title className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
                Tour n°{roundNbr}
            </Title>
        </MainContainer>
    );
}
