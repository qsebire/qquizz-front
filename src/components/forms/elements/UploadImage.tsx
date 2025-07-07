'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { ImageUp } from 'lucide-react';

export default function UploadImage({
    label,
    imageUpload = '',
    onUpload,
}: {
    label: string;
    imageUpload?: string;
    onUpload: (imageUrl: string) => void;
}) {
    const [imageUrl, setImageURL] = useState(imageUpload);

    const handleUpload = (result: any) => {
        console.log('result : ' + result);

        if (result?.info?.secure_url) {
            setImageURL(result?.info?.secure_url);
            onUpload(result?.info?.secure_url);
        }
    };

    return (
        <div className='w-full space-y-4'>
            <div className='space-y-0.5 shrink-0'>
                <p className='font-semibold text-2xl text-white'>{label}</p>
                <CldUploadWidget
                    uploadPreset='qquizz'
                    onSuccess={handleUpload}
                    options={{
                        sources: ['local', 'url'],
                        multiple: false,
                        maxFileSize: 2 * 1024 * 1024, // 2 MB
                        clientAllowedFormats: ['jpg', 'png', 'webp'],
                        cropping: true,
                        maxImageWidth: 1920,
                        maxImageHeight: 1280,
                    }}
                >
                    {({ open }) => (
                        <Button
                            label='Importer une image'
                            type='button'
                            icon={ImageUp}
                            iconPosition='left'
                            onClick={() => open()}
                        />
                    )}
                </CldUploadWidget>
            </div>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt='Preview'
                    className='rounded-xl'
                />
            )}
        </div>
    );
}
