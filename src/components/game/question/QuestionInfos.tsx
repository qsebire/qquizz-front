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
    const { round, updateQuestionStep } = useGameStore();
    const { currentQuestion, nbr, questions } = round;
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
                label={`Tour n°${nbr}`}
                variant='green'
                size='xl'
            />
            <div className='space-y-8'>
                <Title>
                    {isThemeSelectionQuestion
                        ? 'Question pour le choix du thème'
                        : `Question n°${currentQuestion}`}
                </Title>
                <div className='flex justify-center items-center gap-4'>
                    {questionGameModeObj && (
                        <div className='flex items-start'>
                            <Tag
                                label={questionGameModeObj.label}
                                variant='outline'
                                size='2xl'
                            />
                            <InfoButton
                                info={questionGameModeObj.description}
                            />
                        </div>
                    )}
                    {answerModeObj && (
                        <div className='flex items-start'>
                            <Tag
                                label={answerModeObj.label}
                                variant='outline'
                                size='2xl'
                            />
                            <InfoButton info={answerModeObj.description} />
                        </div>
                    )}
                </div>
            </div>
            <Button
                label='Passer à la question'
                onClick={() => updateQuestionStep('question')}
            />
        </MainContainer>
    );
}
