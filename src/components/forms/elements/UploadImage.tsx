'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { ImageUp } from 'lucide-react';
import { cloudinaryFrTranslation } from '../../../../data/cloudinaryUploadWidgetTranslate';
import FieldContainer, { FieldContainerProps } from './FieldContainer';

type UploadImageProps = FieldContainerProps & {
    imageUpload?: string;
    onUpload: (imageUrl: string) => void;
    multiple?: boolean;
};

export default function UploadImage({
    label,
    description,
    errorMessage,
    isOptional,
    imageUpload = '',
    onUpload,
    multiple = false,
}: UploadImageProps) {
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
            <FieldContainer
                label={label}
                description={description}
                errorMessage={errorMessage}
                isOptional={isOptional}
            >
                <CldUploadWidget
                    uploadPreset='qquizz'
                    onSuccess={handleUpload}
                    options={{
                        sources: ['local', 'url', 'image_search'],
                        googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
                        searchByRights: true,
                        multiple: multiple,
                        maxFileSize: 2 * 1024 * 1024, // 2 MB
                        clientAllowedFormats: ['jpg', 'png', 'webp'],
                        cropping: true,
                        maxImageWidth: 1920,
                        maxImageHeight: 1280,
                        croppingAspectRatio: 12 / 9,
                        language: 'fr',
                        text: {
                            fr: cloudinaryFrTranslation,
                        },
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
            </FieldContainer>
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
