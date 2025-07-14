'use client';

import { useEffect, useState } from 'react';
import { URL_BACKEND } from '../../data/general';
import Card from './Card';
import Link from 'next/link';
import Button from './Button';
import { Trash } from 'lucide-react';
import { Theme } from '../../types/question';

const getAllThemes = async () => {
    try {
        const response = await fetch(`${URL_BACKEND}/theme/all`);

        if (!response.ok) {
            const errorData = await response.json();
            window.alert(
                `Erreur : ${errorData.error || 'Suppression échouée.'}`
            );
            return;
        }

        const json = await response.json();
        return json;
    } catch (error) {
        return { error: true, infos: error };
    }
};

const ThemeCard = ({
    onChange,
    ...theme
}: Theme & { onChange: () => void }) => {
    const handleDelete = async () => {
        const confirmation = window.confirm(
            `Étes-vous sûr de vouloir supprimer le thème ${theme.name} ?`
        );

        if (!confirmation) return;

        try {
            const response = await fetch(`${URL_BACKEND}/theme/${theme.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                window.alert(
                    `Erreur : ${errorData.error || 'Suppression échouée.'}`
                );
                return;
            }

            onChange();
            window.alert(`Le thème ${theme.name} a bien été supprimé.`);
        } catch (error) {
            window.alert('Erreur réseau lors de la suppression.');
            console.error(error);
        }
    };

    return (
        <Card className='relative'>
            <p className='text-3xl'>{theme.smiley}</p>
            <p className='text-xl leading-none font-semibold'>{theme.name}</p>
            <button
                className='absolute -bottom-2 right-4 bg-pink-600 text-white p-1 aspect-square rounded shadow-lg shadow-pink-900/40 cursor-pointer'
                onClick={handleDelete}
            >
                <Trash size={20} />
            </button>
        </Card>
    );
};

const AddTheme = () => {
    return (
        <Link href='/dashboard/nouveau-theme'>
            <Card className='bg-violet-700 text-white hover:bg-violet-900'>
                <p className='text-3xl aspect-square rounded font-bold border-2 border-white leading-none'>
                    +
                </p>
                <p className='text-xl leading-none font-semibold'>
                    Ajouter un thème
                </p>
            </Card>
        </Link>
    );
};

export default function ThemesGrid({
    addThemeButton = false,
}: {
    addThemeButton?: boolean;
}) {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [displayAll, setDisplayAll] = useState(false);
    const [toggleThemeEdited, setToggleThemeEdited] = useState(false);
    const maxDisplay = 12;

    useEffect(() => {
        const fetchThemes = async () => {
            const themesFetch = await getAllThemes();
            if (!themesFetch.error) {
                setThemes(themesFetch);
            }
        };
        fetchThemes();
    }, [toggleThemeEdited]);

    const visibleThemes = displayAll
        ? themes
        : themes.slice(
              0,
              displayAll
                  ? undefined
                  : addThemeButton
                  ? maxDisplay - 1
                  : maxDisplay
          );

    const themesDisplay = visibleThemes.map((theme) => {
        return (
            <ThemeCard
                {...theme}
                key={theme.id}
                onChange={() => setToggleThemeEdited((prev) => !prev)}
            />
        );
    });

    return (
        <div className='flex flex-col gap-4 items-end'>
            <div className='w-full grid grid-cols-6 gap-5'>
                {addThemeButton && <AddTheme />}
                {themesDisplay}
            </div>
            <Button
                label={
                    displayAll ? 'Voir moins de thèmes' : 'Voir tous les thèmes'
                }
                variant='violet'
                size='lg'
                onClick={() => setDisplayAll((prev) => !prev)}
            />
        </div>
    );
}
