'use client';

import Input from './elements/Input';
import Textarea from './elements/Textarea';
import {
    allowedGameModes,
    allowedAnswerModes,
} from '../../../data/shared/quizzModes';
import CheckboxButton from './elements/Checkbox';
import { useState } from 'react';

export default function NewQuestionTypeForm() {
    const [gameModes, setGameModes] = useState<string[]>([]);
    const [answerModes, setAnswerModes] = useState<string[]>([]);

    const handleClickGameMode = (name: string) => {
        setGameModes((prev) =>
            prev.includes(name)
                ? prev.filter((mode) => mode !== name)
                : [...prev, name]
        );
    };

    const handleClickAsnwerMode = (name: string) => {
        setAnswerModes((prev) =>
            prev.includes(name)
                ? prev.filter((mode) => mode !== name)
                : [...prev, name]
        );
    };

    const gameModesCheckbox = allowedGameModes.map((gameMode, index) => {
        return (
            <CheckboxButton
                label={gameMode.label}
                checked={gameModes.includes(gameMode.name)}
                onClick={() => handleClickGameMode(gameMode.name)}
                key={index}
            />
        );
    });

    const gameAnswerCheckbox = allowedAnswerModes.map((answerMode, index) => {
        return (
            <CheckboxButton
                label={answerMode.label}
                checked={answerModes.includes(answerMode.name)}
                onClick={() => handleClickAsnwerMode(answerMode.name)}
                key={index}
            />
        );
    });

    return (
        <form className='space-y-4'>
            <Input
                label='Nom'
                name='name'
            />
            <Textarea
                label='Description'
                name='descritpion'
            />
            <div className='space-y-2'>
                <p className='font-medium text-xl'>Mode de jeux autorisées</p>
                <div className='flex gap-4'>{gameModesCheckbox}</div>
            </div>
            <div className='space-y-2'>
                <p className='font-medium text-xl'>Mode de jeux autorisées</p>
                <div className='flex gap-4'>{gameAnswerCheckbox}</div>
            </div>
        </form>
    );
}

// name: z.string().min(1, { message: 'Le nom est requis.' }),
// description: z.string().min(1, { message: 'La description est requise.' }),
// gameModes: z
//     .array(gameModesEnum)
//     .nonempty({ message: 'Au moins un gameMode est requis.' }),
// answerModes: z
//     .array(answerModesEnum)
//     .nonempty({ message: 'Au moins un answerMode est requis.' }),
// requiresImage: z.boolean(),
// requiresTheme: z.boolean(),
// defaultPrompt: z.string().optional(),
