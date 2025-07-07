'use client';

import { useState } from 'react';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import emojiRegex from 'emoji-regex';
import Button from '../Button';
import Input from './elements/Input';

import { URL_BACKEND } from '../../../data/general';

export default function AddThemeForm() {
    const [name, setName] = useState('');
    const [smiley, setSmiley] = useState('🌎');
    const [showSmileyPicker, setShowSmileyPicker] = useState(false);
    const [error, setError] = useState({ isError: false, message: '' });
    const [isValidate, setIsValidate] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim().length === 0) {
            setError({
                isError: true,
                message: 'Veuillez renseigner un thème.',
            });
            setIsValidate(false);
            return;
        }

        const regexEmoji = emojiRegex();

        if (smiley.trim().length === 0) {
            setError({
                isError: true,
                message: 'Veuillez renseigner un emoji pour le thème.',
            });
            setIsValidate(false);
            return;
        }

        if (!regexEmoji.test(smiley)) {
            setError({
                isError: true,
                message: 'Veuillez entrer un emoji Unicode valide.',
            });
            setIsValidate(false);
            return;
        }

        try {
            const resp = await fetch(`${URL_BACKEND}/theme/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, smiley }),
            });
            const json = await resp.json();
            if (!resp.ok) {
                setError({
                    isError: true,
                    message: json?.error || 'Erreur serveur.',
                });
                setIsValidate(false);
                return;
            }

            setError({ isError: false, message: '' });
            setName('');
            setIsValidate(true);
        } catch (err) {
            setError({ isError: true, message: 'Erreur lors de la requête.' });
            setIsValidate(false);
        }
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setSmiley(emojiData.emoji);
        setShowSmileyPicker(false);
    };

    return (
        <form
            className='space-y-4 flex flex-col items-center gap-4'
            onSubmit={handleSubmit}
        >
            <div className='flex gap-4 w-full'>
                <div className='relative'>
                    <div className='space-y-0.5 w-full'>
                        <p className='font-semibold text-2xl text-white'>
                            Émoji
                        </p>
                        <button
                            className='ring-1 ring-white text-white w-full rounded-lg pt-2.5 pb-1.5 px-3 text-xl text-center cursor-pointer'
                            onClick={() => setShowSmileyPicker((val) => !val)}
                        >
                            {smiley ? smiley : 'Select'}
                        </button>
                    </div>
                    {showSmileyPicker && (
                        <div className='absolute left-22 top-1/2 -translate-y-1/2 shadow-2xl shadow-violet-900/40'>
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                skinTonesDisabled={true}
                            />
                        </div>
                    )}
                </div>
                <Input
                    label='Nom du thème'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
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
