'use client';

import MemberImage from "@/components/MemberImage";
import { Photo } from "../../../../../generated/prisma/client"
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import { useState } from "react";
import { deleteImage, setMainImage } from "@/lib/actions/member-actions";
import { toast } from "react-toastify";

type Props = {
    photos: Photo[] | null;
    mainImageUrl?: string | null
    isOwner?: boolean;
}

export default function MemberPhotos({ photos, mainImageUrl, isOwner }: Props) {
    const [loadingMain, setLoadingMain] = useState<Record<string, boolean>>({});
    const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>({});

    const handleSetMain = async (photo: Photo) => {
        if (mainImageUrl === photo.url) return;

        setLoadingMain(prev => ({...prev, [photo.id]: true}));

        try {
            await setMainImage(photo);
            toast.success('Main photo updated');
        } catch (error) {
            toast.error('Failed to set main photo');
            console.log(error);
        } finally {
            setLoadingMain(prev => ({...prev, [photo.id]: false}));
        }
    }

    const handleDelete = async (photo: Photo) => {
        if (mainImageUrl === photo.url) return;
        setLoadingDelete(prev => ({...prev, [photo.id]: true}));
        try {
            await deleteImage(photo);
            toast.success('Photo deleted');
        } catch (error) {
            toast.error('Failed to delete photo');
            console.log(error);
        } finally {
            setLoadingDelete(prev => ({...prev, [photo.id]: false}));
        }
    }


    return (
        <div className="grid grid-cols-5 gap-3 p-5">
            {photos?.map(photo => (
                <div key={photo.id} className="relative">
                    <MemberImage photo={photo} />
                    {isOwner && (
                        <>
                            <div onClick={() => handleSetMain(photo)} className="absolute top-3 left-3 z-20">
                                <StarButton selected={photo.url === mainImageUrl} 
                                    loading={loadingMain[photo.id]} />
                            </div>
                            <div onClick={() => handleDelete(photo)} className="absolute top-3 right-3 z-20">
                                <DeleteButton loading={loadingDelete[photo.id]} />
                            </div>
                        
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}