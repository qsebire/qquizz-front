import { useState } from 'react';

import CheckboxButton from './CheckboxButton';
import { Info } from 'lucide-react';

export default function CheckboxsWithInfo({
    checkboxArrWithInfos,
}: {
    checkboxArrWithInfos: {
        name: string;
        label: string;
        description: React.JSX.Element;
    }[];
}) {
    const [checked, setChecked] = useState<string[]>([]);

    const handleCheckbox = (name: string) => {
        setChecked((prev) =>
            prev.includes(name)
                ? prev.filter((mode) => mode !== name)
                : [...prev, name]
        );
    };

    const gameModesCheckbox = checkboxArrWithInfos.map((checkbox, index) => {
        return (
            <div key={index}>
                <CheckboxButton
                    label={checkbox.label}
                    checked={checked.includes(checkbox.name)}
                    onClick={() => handleCheckbox(checkbox.name)}
                />
                <Info />
            </div>
        );
    });

    return (
        <div className='space-y-2'>
            <p className='font-medium text-xl'>Mode de jeux autorisées</p>
            <div className='flex gap-4'>{gameModesCheckbox}</div>
        </div>
    );
}
