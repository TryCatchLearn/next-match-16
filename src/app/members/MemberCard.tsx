import Link from "next/link"
import { Member } from "../../../generated/prisma/client"
import { Card, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { calculateAge, transformImageUrl } from "@/lib/utils"
import LikeButton from "@/components/LikeButton"

type Props = {
    member: Member;
    likeIds: string[];
}

export default function MemberCard({ member, likeIds }: Props) {
    const hasLiked = likeIds.includes(member.userId);

    return (
        <Link href={`/members/${member.userId}`}>
            <Card className="relative mx-auto w-full py-0 transition-all duration-300 
            hover:scale-105 hover:shadow-lg hover:shadow-muted-foreground">
                <div className="relative">
                    <Image
                        alt={member.name}
                        width={300}
                        height={300}
                        src={transformImageUrl(member.imageUrl) || '/images/user.png'}
                        className="rounded-lg"
                        unoptimized
                        loading="eager"
                    />
                    <div className="absolute top-3 right-3 z-20">
                        <LikeButton targetUserId={member.userId} hasLiked={hasLiked} />
                    </div>
                </div>

                <CardFooter className="flex w-full rounded-lg pb-2 justify-start 
            bg-linear-to-t from-black to-black/0 overflow-hidden absolute bottom-0 z-10">
                    <div className="flex flex-col text-white">
                        <span className="font-semibold">{member.name}, {calculateAge(member.dateOfBirth)}</span>
                        <span className="text-sm">{member.city}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}