'use client';

import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import { useGameStore } from '../../../../stores';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

export default function QuestionWaitingAnswer() {
    const { round, gameRules, updateQuestionStep } = useGameStore();
    const { questions, currentQuestion } = round;
    const { questionPerRound } = gameRules;
    const isThemeSelectionQuestion = currentQuestion === 0;

    const { questionGameMode, question } = questions[currentQuestion];

    return (
        <MainContainer className='flex flex-col gap-10 items-center justify-between py-6 relative overflow-visible'>
            <Tag
                label={
                    isThemeSelectionQuestion
                        ? 'Qui choisi le thème ?'
                        : `Question ${currentQuestion}/${questionPerRound}`
                }
                size='xl'
                className='absolute -top-7'
            />
            <div />
            <div className='space-y-6'>
                <p className='text-4xl font-bold text-teal-300 text-center'>
                    {question}
                </p>
                <Title className='max-w-4xl leading-tight'>
                    {questionGameMode === 'SPEED'
                        ? "L'équipe répondante donne sa réponse"
                        : 'Toutes les équipes donnent leur réponse'}
                </Title>
            </div>

            <Button
                label='Voir la bonne réponse'
                size='2xl'
                onClick={() => updateQuestionStep('answer')}
            />
        </MainContainer>
    );
}
