import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';
import { v4 as uuidv4 } from 'uuid';

import FieldContainer, { FieldContainerProps } from './FieldContainer';

type InputProps = InputHTMLAttributes<HTMLInputElement> &
    FieldContainerProps & {
        suggestions: string[];
    };

const InputSuggestion = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            description,
            errorMessage,
            isOptional,
            suggestions,
            className,
            ...props
        },
        ref
    ) => {
        const listId = uuidv4();
        const suggestionsWithoutDuplicate = [...new Set(suggestions)];

        return (
            <FieldContainer
                label={label}
                description={description}
                errorMessage={errorMessage}
                isOptional={isOptional}
            >
                <input
                    ref={ref}
                    className={cn(
                        'ring-1 ring-white text-white focus-visible:bg-violet-500 focus-visible:outline-0 focus-visible:shadow-xl shadow-violet-900/40 w-full rounded-lg py-2 px-3 text-xl',
                        className
                    )}
                    list={listId}
                    {...props}
                />
                <datalist id={listId}>
                    {suggestionsWithoutDuplicate.map((suggestion) => {
                        return (
                            <option
                                value={suggestion}
                                key={suggestion}
                            />
                        );
                    })}
                </datalist>
            </FieldContainer>
        );
    }
);

export default InputSuggestion;
