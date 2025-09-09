'use client';

import { useGameStore } from '../../../../stores';

import MainContainer from '@/components/MainContainer';
import Tag from '@/components/Tag';
import Title from '@/components/texts/Title';
import {
    answerModes,
    questionGameModes,
} from '../../../../data/shared/quizzModes';
import InfoButton from '@/components/InfoButton';
import Button from '@/components/Button';

export default function QuestionInfos() {
    const { round, gameRules, updateQuestionStep } = useGameStore();
    const { currentQuestion, nbr, questions } = round;
    const { questionPerRound } = gameRules;
    const isThemeSelectionQuestion = currentQuestion === 0;
    const { answerMode, questionGameMode, theme, subTheme } =
        questions[currentQuestion];

    const questionGameModeObj = questionGameModes.find(
        (qgm) => qgm.name === questionGameMode
    );
    const answerModeObj = answerModes.find((am) => am.name === answerMode);

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
            <div className='space-y-10'>
                <div className='space-y-6'>
                    <p className='text-4xl font-bold text-teal-300 text-center'>
                        {theme.name}
                        {subTheme && ' - ' + subTheme.name}
                    </p>
                    <Title>
                        {isThemeSelectionQuestion
                            ? 'Question pour le choix du thème'
                            : `Question n°${currentQuestion}`}
                    </Title>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    {questionGameModeObj && (
                        <div className='relative'>
                            <Tag
                                label={questionGameModeObj.label}
                                variant='outline'
                                size='xl'
                            />
                            <div className='absolute top-0 -right-2'>
                                <InfoButton
                                    info={questionGameModeObj.description}
                                />
                            </div>
                        </div>
                    )}
                    {answerModeObj && (
                        <div className='relative'>
                            <Tag
                                label={answerModeObj.label}
                                variant='outline'
                                size='xl'
                            />
                            <div className='absolute top-0 -right-2'>
                                <InfoButton info={answerModeObj.description} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Button
                label='Passer à la question'
                onClick={() => updateQuestionStep('question')}
                size='2xl'
            />
        </MainContainer>
    );
}
