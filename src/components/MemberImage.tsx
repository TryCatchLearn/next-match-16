'use client';

import { CldImage } from "next-cloudinary";
import { Photo } from "../../generated/prisma/client"
import Image from 'next/image';

type Props = {
    photo: Photo;
}

export default function MemberImage({ photo }: Props) {

    return (
        <div>
            {photo.publicId ? (
                <CldImage
                    alt="image of member"
                    src={photo.publicId}
                    width={300}
                    height={300}
                    crop='fill'
                    gravity="faces"
                    className="rounded-lg"
                />
            ) : (
                <Image
                    className="rounded-lg"
                    width={300}
                    height={300}
                    src={photo.url}
                    alt="Image of member"
                    unoptimized
                />
            )}
        </div>
    )
}