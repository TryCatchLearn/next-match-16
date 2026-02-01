'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Member } from "../../../../generated/prisma/client"
import Image from 'next/image';
import { calculateAge, transformImageUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Props = {
    member: Member;
    navLinks: {name: string, href: string}[];
}

export default function MemberSidebar({member, navLinks}: Props) {
    const pathname = usePathname();

    return (
        <Card className="w-full mt-10 items-center h-[80vh]">
            <Image 
                alt={member.name}
                width={300}
                height={300}
                src={transformImageUrl(member?.imageUrl) || '/images/user.png'}
                className="rounded-lg"
                unoptimized
                loading="eager"
            />
            <CardContent>
                <div className="flex flex-col items-center">
                    <div className="text-2xl">
                        {member.name}, {calculateAge(member.dateOfBirth)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {member.city}, {member.country}
                    </div>
                </div>
                <Separator className="my-3" />
                <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
                    {navLinks.map(link => (
                        <Link
                            href={link.href}
                            key={link.name}
                            className={pathname === link.href ? 'text-primary' 
                                : 'hover:text-primary/50'}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardContent>
            <CardFooter>
                <Link href='/members'>
                    <Button asChild>Go back</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}