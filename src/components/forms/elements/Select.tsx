import { SelectHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';

import FieldContainer, { FieldContainerProps } from './FieldContainer';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
    FieldContainerProps & {
        options: {
            value: string | number;
            label: string;
            id?: string | number;
        }[];
    };

export default function Select({
    options,
    label,
    description,
    errorMessage,
    isOptional,
    className,
    ...props
}: SelectProps) {
    const optionsElements = options.map((option, id) => {
        return (
            <option
                key={option.id || id}
                value={option.value}
            >
                {option.label}
            </option>
        );
    });

    return (
        <FieldContainer
            label={label}
            description={description}
            errorMessage={errorMessage}
            isOptional={isOptional}
        >
            <select
                className={cn(
                    'ring-1 ring-white text-white focus-visible:bg-violet-500 focus-visible:outline-0 focus-visible:shadow-xl shadow-violet-900/40 w-full rounded-lg py-2 px-3 text-xl',
                    className
                )}
                autoComplete='on'
                {...props}
            >
                {optionsElements}
            </select>
        </FieldContainer>
    );
}
