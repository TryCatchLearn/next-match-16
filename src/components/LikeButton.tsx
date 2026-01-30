'use client';

import { toggleLikeMember } from "@/lib/actions/like-actions";
import { Heart } from "lucide-react";

type Props = {
    targetUserId: string;
    hasLiked: boolean;
}

export default function LikeButton({ targetUserId, hasLiked }: Props) {
    async function toggleLike(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        await toggleLikeMember(targetUserId, hasLiked);
    }

    return (
        <div onClick={toggleLike} className="hover:opacity-80 transition cursor-pointer">
            <Heart
                size={28}
                color={hasLiked ? 'white' : 'black'}
                className={
                    hasLiked ? 'fill-red-500' : ''
                }
            />
        </div>
    )
}