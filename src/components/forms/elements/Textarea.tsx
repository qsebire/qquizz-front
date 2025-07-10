import { InputHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';

import FieldContainer, { FieldContainerProps } from './FieldContainer';

type InputProps = InputHTMLAttributes<HTMLTextAreaElement> &
    FieldContainerProps;

export default function Textarea({
    label,
    description,
    errorMessage,
    isOptional,
    className,
    ...props
}: InputProps) {
    return (
        <FieldContainer
            label={label}
            description={description}
            errorMessage={errorMessage}
            isOptional={isOptional}
        >
            <textarea
                className={cn(
                    'ring-1 ring-white text-white focus-visible:bg-violet-500 focus-visible:outline-0 focus-visible:shadow-xl shadow-violet-900/40 w-full rounded-lg py-2 px-3 text-xl',
                    className
                )}
                {...props}
            />
        </FieldContainer>
    );
}
