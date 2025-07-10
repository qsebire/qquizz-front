import React from 'react';

import Button from '../Button';
import Input from './elements/Input';
import { CirclePlus, X } from 'lucide-react';

import { AnswerProps } from '../../../data/dataTypes';
import RadioButton from './elements/RadioButton';

const AnswerForm = React.memo(function AnswerForm({
    placeholder,
    isCorrect,
    text,
    onChange,
    onDelete,
    canBeDeleted = false,
}: Omit<AnswerProps, 'id'> & {
    placeholder: string;
    onDelete: () => void;
    canBeDeleted?: boolean;
    onChange: (text: string, isCorrect: boolean) => void;
}) {
    return (
        <>
            <div className='col-span-10 flex items-center gap-2'>
                {canBeDeleted && (
                    <X
                        onClick={onDelete}
                        className='stroke-white cursor-pointer'
                    />
                )}
                <Input
                    placeholder={placeholder}
                    value={text}
                    onChange={(e) => onChange(e.currentTarget.value, isCorrect)}
                />
            </div>
            <div className='col-span-2 self-center justify-self-center'>
                <RadioButton
                    className='h-6'
                    isChecked={isCorrect}
                    onClick={() => {
                        if (!isCorrect) {
                            onChange(text, true);
                        } else {
                            alert(
                                'Il doit toujours y avoir une bonne réponse.'
                            );
                        }
                    }}
                />
            </div>
        </>
    );
});

export default function AnswersForm({
    answers,
    onAnswersChange,
    onAddAnswer,
    onDeleteAnswer,
    canDeletAnswer,
    canAddAnswer,
}: {
    answers: AnswerProps[];
    onAnswersChange: (text: string, isCorrect: boolean, id: string) => void;
    onAddAnswer: () => void;
    onDeleteAnswer: (id: string) => void;
    canDeletAnswer: boolean;
    canAddAnswer: boolean;
}) {
    const answersDisplay = answers.map((answer, index) => {
        return (
            <AnswerForm
                placeholder={`Réponse n°${index + 1}`}
                key={answer.id}
                isCorrect={answer.isCorrect}
                text={answer.text}
                canBeDeleted={canDeletAnswer}
                onDelete={() => onDeleteAnswer(answer.id)}
                onChange={(text, isCorrect) =>
                    onAnswersChange(text, isCorrect, answer.id)
                }
            />
        );
    });

    return (
        <div className='space-y-6'>
            <div className='w-full grid grid-cols-12 items-end gap-4'>
                <p className='col-span-10 text-lg text-white font-semibold'>
                    Intitulés des réponses
                </p>
                <p className='col-span-2 text-center text-lg text-white font-semibold leading-none'>
                    Bonne réponse
                </p>
                {answersDisplay}
            </div>
            {canAddAnswer && (
                <Button
                    label='Ajouter une réponse'
                    size='md'
                    icon={CirclePlus}
                    type='button'
                    onClick={onAddAnswer}
                />
            )}
        </div>
    );
}
