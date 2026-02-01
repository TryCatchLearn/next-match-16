'use client';

import ImageUploadButton from "@/components/ImageUploadButton";
import { addImage } from "@/lib/actions/member-actions";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { toast } from "react-toastify";

export default function PhotoUpload() {
    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id);
        } else {
            toast.error('Problem adding image');
        }
    }

    return (
        <div>
            <ImageUploadButton onUploadImageAction={onAddImage} />
        </div>
    )
}