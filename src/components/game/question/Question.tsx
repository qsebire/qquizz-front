'use client';

import Title from '@/components/texts/Title';
import MainContainer from '@/components/MainContainer';
import Image from 'next/image';
import { shuffleArray } from '../../../../utils/hooks';
import Timer from '../elements/Timer';
import { useGameStore } from '../../../../stores';
import Button from '@/components/Button';
import { useEffect } from 'react';
import Tag from '@/components/Tag';

export default function Question() {
    const { round, updateQuestionStep, gameRules } = useGameStore();
    const { questions, currentQuestion } = round;
    const { timePerQuestion, questionPerRound } = gameRules;
    const isThemeSelectionQuestion = currentQuestion === 0;

    const {
        answerMode,
        questionGameMode,
        answers,
        question,
        type,
        emojis,
        mediaUrl,
    } = questions[currentQuestion];

    const shuffleAnswers = shuffleArray(answers);

    useEffect(() => {
        if (!isThemeSelectionQuestion) {
            const goToWaitingAnswer = setTimeout(
                () => updateQuestionStep('waitingAnswer'),
                timePerQuestion
            );

            return () => {
                clearTimeout(goToWaitingAnswer);
            };
        }
    }, [isThemeSelectionQuestion, timePerQuestion]);

    return (
        <MainContainer className='flex flex-col gap-10 items-center justify-center py-6 relative overflow-visible'>
            <Tag
                label={
                    isThemeSelectionQuestion
                        ? 'Qui choisi le thème ?'
                        : `Question ${currentQuestion}/${questionPerRound}`
                }
                size='xl'
                className='absolute -top-7'
            />

            {type === 'IMAGE' && mediaUrl && (
                <div className='relative size-full max-w-3/5 max-h-1/2'>
                    <Image
                        src={mediaUrl}
                        alt='Question Image'
                        fill
                        className='object-contain drop-shadow-2xl drop-shadow-violet-950/40'
                    />
                </div>
            )}
            <div className='space-y-4 h-fit'>
                <div className='space-y-8'>
                    <Title>{question}</Title>
                    {answerMode === 'MCQ' && (
                        <div className='flex gap-4 justify-between'>
                            {shuffleAnswers.map((answer) => {
                                return (
                                    <div
                                        className='w-full min-h-20 p-3 flex items-center justify-center bg-violet-950 border-2 border-violet-300 rounded-2xl text-2xl text-white text-center font-semibold leading-tight shadow-xl shadow-violet-950/40'
                                        key={answer.id}
                                    >
                                        {answer.text}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className='absolute -bottom-9 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4'>
                {!isThemeSelectionQuestion && (
                    <Timer duration={timePerQuestion} />
                )}
                {questionGameMode === 'SPEED' && (
                    <div className='bg-white flex items-center gap-4 p-2 rounded-3xl'>
                        <Button
                            label='Répondre'
                            variant='green'
                            size='2xl'
                            onClick={() => updateQuestionStep('waitingAnswer')}
                        />
                    </div>
                )}
            </div>
        </MainContainer>
    );
}
