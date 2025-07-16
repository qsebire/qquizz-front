'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TTeam } from '../../../types/game';
import Input from './elements/Input';
import { colorTeam } from '../../../data/shared/quizzModes';
import Button from '../Button';
import { useGameStore } from '../../../stores';
import {
    arraysEqual,
    arrayToHslString,
    getRandomElementInArr,
} from '../../../utils/hooks';
import { THslArray } from '../../../types';

function ColorSelect({
    color: currentColor,
    onSelectColor,
    allowColors,
}: {
    color: THslArray;
    onSelectColor: (color: THslArray) => void;
    allowColors?: THslArray[];
}) {
    const popoverRef = useRef<HTMLDivElement>(null);

    const colors = allowColors || colorTeam;

    const [showColors, setShowColors] = useState(false);

    const handleSelect = (color: THslArray) => {
        onSelectColor(color);
        setShowColors(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(document.activeElement)
            ) {
                setShowColors(false);
            }
        }, 100);
    };

    return (
        <div
            className='relative'
            onBlur={handleBlur}
        >
            <button
                className='aspect-square w-12 rounded-lg block border border-white cursor-pointer shadow-xl shadow-violet-900/40'
                style={{ background: arrayToHslString(currentColor) }}
                onClick={() => setShowColors((prev) => !prev)}
                type='button'
            />
            {showColors && (
                <div
                    ref={popoverRef}
                    className='absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white p-2 z-[999999] rounded-xl grid grid-cols-4 gap-2 w-max'
                >
                    {colors.map((color, index) => {
                        return (
                            <button
                                key={index}
                                className='aspect-square w-10 rounded-lg cursor-pointer'
                                style={{ background: arrayToHslString(color) }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(color);
                                }}
                                type='button'
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function AddTeamForm() {
    const { addTeam, teams } = useGameStore();

    const [error, setError] = useState<{
        isError: boolean;
        message: string;
    }>({ isError: false, message: '' });
    const [allowColors, setAllowColors] = useState(colorTeam);
    const [team, setTeam] = useState<TTeam>({
        id: uuidv4(),
        name: '',
        score: 0,
        color: getRandomElementInArr(colorTeam),
    });

    useEffect(() => {
        const checkColors = colorTeam.filter(
            (color) => !teams.some((team) => arraysEqual(team.color, color))
        );
        setAllowColors(checkColors);
        setTeam({ ...team, color: getRandomElementInArr(checkColors) });
    }, [teams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!team.id) {
            setError({
                isError: true,
                message: 'Une erreur est survenue, merci de recharger la page.',
            });
            return;
        }

        if (!team.name) {
            setError({
                isError: true,
                message: "Vous devez renseigner un nom d'équipe.",
            });
            return;
        }

        if (!team.color) {
            setError({
                isError: true,
                message: 'Vous devez sélectionner une couleur.',
            });
            return;
        }

        addTeam(team);
        setTeam({
            id: uuidv4(),
            name: '',
            score: 0,
            color: allowColors[0],
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4'
        >
            <div className='flex gap-4 items-end relative'>
                <Input
                    label="Nom de l'équipe"
                    value={team.name}
                    onChange={(e) =>
                        setTeam({ ...team, name: e.currentTarget.value })
                    }
                />
                <ColorSelect
                    color={team.color}
                    onSelectColor={(color) => setTeam({ ...team, color })}
                    allowColors={allowColors}
                />
                <Button
                    label='Ajouter'
                    onClick={handleSubmit}
                    type='submit'
                />
            </div>
            {error.isError && (
                <p className='bg-pink-700 py-2 px-4 rounded-2xl text-lg font-medium text-white text-center space-y-1'>
                    {error.message}
                </p>
            )}
        </form>
    );
}
