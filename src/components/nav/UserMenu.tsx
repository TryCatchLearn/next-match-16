'use client';

import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { transformImageUrl } from "@/lib/utils";

type Props = {
    user: User
}

export default function UserMenu({ user }: Props) {
    const router = useRouter();

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    router.push('/');
                    router.refresh();
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar size="lg">
                    <AvatarImage src={transformImageUrl(user?.image) || ''} alt={user.name || 'User image'} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="h-14 flex" textValue="user avatar">
                        <span className="font-semibold">Signed in as {user.name}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem textValue="Edit profile">
                    <Link href={`/members/${user.id}`}>
                        Edit profile
                    </Link>

                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={signOut}
                    textValue="Logout"
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}