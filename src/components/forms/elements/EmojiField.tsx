'use cleint';

import { ChangeEventHandler, useRef, useState } from 'react';

import Input from './Input';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { cn } from '../../../../lib/cn';
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config';

type EmojiFieldProps = {
    value?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onEmojiClick: MouseDownEvent;
};

export default function EmojiField({
    value,
    onChange,
    onEmojiClick,
}: EmojiFieldProps) {
    const emojiInputRef = useRef<HTMLInputElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const [showSmileyPicker, setShowSmileyPicker] = useState(false);

    const handleEmojiesBlur = () => {
        setTimeout(() => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(document.activeElement)
            ) {
                setShowSmileyPicker(false);
            }
        }, 100);
    };

    return (
        <div className='relative'>
            <Input
                ref={emojiInputRef}
                label='Émojies à deviner'
                value={value}
                placeholder='👋👋👋'
                onChange={onChange}
                onFocus={() => {
                    setShowSmileyPicker(true);
                }}
                onBlur={handleEmojiesBlur}
            />
            <div
                ref={emojiPickerRef}
                className={cn(
                    'absolute right-0 mr-4 top-1/2 -translate-y-1/2 shadow-2xl shadow-violet-900/40',
                    showSmileyPicker ? 'block' : 'hidden'
                )}
                onBlur={handleEmojiesBlur}
            >
                <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    skinTonesDisabled={true}
                />
            </div>
        </div>
    );
}
