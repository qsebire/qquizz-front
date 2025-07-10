import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../../../lib/cn';

import FieldContainer, { FieldContainerProps } from './FieldContainer';

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldContainerProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { label, description, errorMessage, isOptional, className, ...props },
        ref
    ) => {
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
                    {...props}
                />
            </FieldContainer>
        );
    }
);

export default Input;
