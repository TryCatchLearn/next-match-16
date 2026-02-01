'use client';

import { ImageIcon } from 'lucide-react';
import {CldUploadButton, CloudinaryUploadWidgetResults} from 'next-cloudinary';

type Props = {
    onUploadImageAction: (result: CloudinaryUploadWidgetResults) => void;
}

export default function ImageUploadButton({onUploadImageAction}: Props) {
  return (
    <CldUploadButton
        options={{maxFiles: 1}}
        onSuccess={onUploadImageAction}
        signatureEndpoint='/api/sign-image'
        uploadPreset='nm16-demo'
        className='flex items-center gap-2 bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary/70'
    >
        <ImageIcon size={28} />
        Upload new image
    </CldUploadButton>
  )
}