'use server';

import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-actions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const user = await getCurrentUser();

        if (!user) redirect('/login');

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: user.id,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: user.id,
                    targetUserId
                }
            })
        }
        revalidatePath('/members');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const user = await getCurrentUser();

        if (!user) redirect('/login');

        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: user.id
            },
            select: {
                targetUserId: true
            }
        })

        return likeIds.map(id => id.targetUserId);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLikedMembers(type = 'target') {
    try {
        const user = await getCurrentUser();
        if (!user) redirect('/login');

        switch (type) {
            case 'target':
                return fetchTargetLikes(user.id);
            case 'source':
                return fetchSourceLikes(user.id);
            case 'mutual':
                return fetchMutualLikes(user.id);
            default:
               return [];
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchTargetLikes(id: string) {
    const targetList = await prisma.like.findMany({
        where: { sourceUserId: id },
        select: { targetMember: true }
    });

    return targetList.map(x => x.targetMember);
}

async function fetchSourceLikes(id: string) {
    const sourceList = await prisma.like.findMany({
        where: { targetUserId: id },
        select: { sourceMember: true }
    });

    return sourceList.map(x => x.sourceMember);
}

async function fetchMutualLikes(id: string) {
    const likedUserIds = await prisma.like.findMany({
        where: {sourceUserId: id},
        select: {targetUserId: true}
    });
    const likedIds = likedUserIds.map(x => x.targetUserId);

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                {targetUserId: id},
                {sourceUserId: {in: likedIds}}
            ]
        },
        select: {sourceMember: true}
    });

    return mutualList.map(x => x.sourceMember);
}

