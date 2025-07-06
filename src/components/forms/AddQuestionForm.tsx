'use client';

import { useState } from 'react';
import { useUser } from '@stackframe/stack';

import Button from '../Button';
import Input from './elements/Input';

import { formDataQuestionType } from '../../../data/dataTypes';

export default function AddQuestionForm() {
    const user = useUser();

    const [error, setError] = useState({ isError: false, message: '' });
    const [isValidate, setIsValidate] = useState(false);
    const [formData, setFormData] = useState<formDataQuestionType>({
        question: '',
        type: 'TEXT',
        themeId: 1,
        difficulty: 1,
        mediaUrl: '',
        emojis: '',
        answerDetail: '',
        userId: user?.id,
        answers: [],
    });

    return (
        <form
            className='space-y-4 flex flex-col items-center gap-4'
            // onSubmit={handleSubmit}
        >
            <div className='flex gap-4 w-full'>
                <Input
                    label='Question'
                    name='question'
                    value={formData.question}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            question: e.currentTarget.value,
                        })
                    }
                    placeholder='Ex : Histoire'
                />
            </div>

            <Button
                label='Ajouter le thème'
                type='submit'
            />
            {error.isError && (
                <div className='bg-pink-700 py-2 px-4 rounded-2xl'>
                    <p className='text-lg font-medium text-white text-center'>
                        {error.message}
                    </p>
                </div>
            )}
            {isValidate && (
                <div className='bg-teal-400 py-2 px-4 rounded-2xl'>
                    <p className='text-lg font-medium text-teal-950 text-center'>
                        Le thème a bien été ajouté !
                    </p>
                </div>
            )}
        </form>
    );
}
