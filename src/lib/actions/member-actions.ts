'use server';

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { getCurrentUser } from "./auth-actions";
import { revalidatePath } from "next/cache";
import { Photo } from "../../../generated/prisma/client";
import { cloudinary } from "../cloudinary";

export async function getMembers() {
    const user = await getCurrentUser();
    if (!user) return null;

    try {
        return prisma.member.findMany({
            where: {NOT: {userId: user.id}}
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({where: {userId}})
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    try {
        const user = await getCurrentUser();
        if (!user) redirect('/login');

        const member = await prisma.member.findUnique({
            where: {userId},
            select: {photos: true}
        })

        if (!member) return null;

        return member.photos;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const user = await getCurrentUser();
        if (!user) return null;

        const result = await prisma.member.update({
            where: {userId: user.id},
            data: {
                photos: {
                    create: [
                        {url, publicId}
                    ]
                }
            }
        })

        revalidatePath(`/members/${user.id}/photos`);

        return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const user = await getCurrentUser();
        if (!user) return null;

        const result = await prisma.user.update({
            where: {id: user.id},
            data: {
                image: photo.url,
                member: {
                    update: {
                        imageUrl: photo.url
                    }
                }
            }
        });

        revalidatePath(`/members/${user.id}/photos`);

        return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteImage(photo: Photo) {
    try {
        const user = await getCurrentUser();
        if (!user) return null;

        if (photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId);
        }

        const result = await prisma.member.update({
            where: {userId: user.id},
            data: {
                photos: {
                    delete: {id: photo.id}
                }
            }
        });

        revalidatePath(`/members/${user.id}/photos`);

        return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}